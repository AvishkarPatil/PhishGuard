import { doc, addDoc, collection, runTransaction, Timestamp } from 'firebase/firestore'
import { db } from './firebase'
import { Scenario, Attempt, UserProfile } from '@/types'

export async function handleSimulationAction(
  userId: string,
  scenario: Scenario,
  action: 'reported' | 'clicked' | 'ignored',
  timeToDecisionMs: number
): Promise<string> {
  const isPhish = scenario.answerKey.isPhish
  let result: 'safe' | 'unsafe'
  let pointsAwarded = 0

  // Determine result and points
  if (isPhish) {
    // It's a phishing attempt
    if (action === 'reported') {
      result = 'safe'
      pointsAwarded = scenario.points
    } else {
      result = 'unsafe'
      pointsAwarded = 0
    }
  } else {
    // It's legitimate
    if (action === 'reported') {
      result = 'unsafe'
      pointsAwarded = 0
    } else {
      result = 'safe'
      pointsAwarded = scenario.points
    }
  }

  // Create attempt object
  const attempt: Omit<Attempt, 'id'> = {
    userId,
    scenarioId: scenario.id,
    action,
    timeToDecisionMs,
    result,
    pointsAwarded,
    createdAt: Timestamp.now(),
  }

  // Use transaction to update both attempt and user profile
  const attemptRef = await addDoc(collection(db, 'attempts'), attempt)
  
  await runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', userId)
    const userDoc = await transaction.get(userRef)
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile
      const newScore = userData.scoreTotal + pointsAwarded
      const newCompletedIds = [...userData.completedScenarioIds, scenario.id]
      
      // Check for badge eligibility (simple example)
      const newBadges = [...userData.badges]
      if (newScore >= 500 && !newBadges.includes('High Scorer')) {
        newBadges.push('High Scorer')
      }
      if (newCompletedIds.length >= 5 && !newBadges.includes('Training Complete')) {
        newBadges.push('Training Complete')
      }

      transaction.update(userRef, {
        scoreTotal: newScore,
        completedScenarioIds: newCompletedIds,
        badges: newBadges,
        lastActive: Timestamp.now(),
      })
    }
  })

  return attemptRef.id
}
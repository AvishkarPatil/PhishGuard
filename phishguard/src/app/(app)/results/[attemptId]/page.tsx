import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Attempt, Scenario } from '@/types'
import ResultsDisplay from '@/components/results/ResultsDisplay'
import scenariosData from '@/data/scenarios.json'

interface PageProps {
  params: { attemptId: string }
}

export default async function ResultsPage({ params }: PageProps) {
  const attemptDoc = await getDoc(doc(db, 'attempts', params.attemptId))
  
  if (!attemptDoc.exists()) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-50">Results Not Found</h1>
        <p className="text-slate-400 mt-2">The requested results could not be found.</p>
      </div>
    )
  }

  const attempt = { id: attemptDoc.id, ...attemptDoc.data() } as Attempt
  
  // Find the corresponding scenario from local data
  const scenario = scenariosData.find(s => s.id === attempt.scenarioId) as Scenario
  
  if (!scenario) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-50">Scenario Not Found</h1>
        <p className="text-slate-400 mt-2">The scenario data could not be found.</p>
      </div>
    )
  }

  return <ResultsDisplay attempt={attempt} scenario={scenario} />
}
import type { Scenario, Attempt } from "@/types"

export interface ScoreResult {
  result: "safe" | "unsafe"
  pointsAwarded: number
  feedback: string
}

export function calculateScore(
  scenario: Scenario,
  action: "reported" | "clicked" | "ignored",
  timeToDecisionMs: number,
): ScoreResult {
  let result: "safe" | "unsafe"
  let pointsAwarded = 0
  let feedback = ""

  if (scenario.answerKey.isPhish) {
    // This is a phishing attempt
    switch (action) {
      case "reported":
        result = "safe"
        pointsAwarded = scenario.points
        feedback = "Excellent! You correctly identified this phishing attempt."
        break
      case "clicked":
        result = "unsafe"
        pointsAwarded = 0
        feedback = "This was a phishing attempt. Clicking the link could have compromised your security."
        break
      case "ignored":
        result = "unsafe"
        pointsAwarded = Math.floor(scenario.points * 0.3) // Partial credit
        feedback = "While ignoring suspicious messages isn't wrong, reporting them helps protect others too."
        break
    }
  } else {
    // This is legitimate
    switch (action) {
      case "reported":
        result = "unsafe"
        pointsAwarded = 0
        feedback = "This was a legitimate message. Reporting it as phishing could cause unnecessary concern."
        break
      case "clicked":
        result = "safe"
        pointsAwarded = scenario.points
        feedback = "Correct! This was a legitimate message and safe to interact with."
        break
      case "ignored":
        result = "safe"
        pointsAwarded = Math.floor(scenario.points * 0.7) // Partial credit
        feedback = "This was legitimate, but being cautious is generally good practice."
        break
    }
  }

  // Time bonus/penalty
  if (timeToDecisionMs < 5000) {
    // Very quick decision - might be too hasty
    pointsAwarded = Math.floor(pointsAwarded * 0.9)
  } else if (timeToDecisionMs > 60000) {
    // Very slow decision - might indicate uncertainty
    pointsAwarded = Math.floor(pointsAwarded * 0.95)
  }

  return { result, pointsAwarded, feedback }
}

export function getBadgeEligibility(attempts: Attempt[]): string[] {
  const badges: string[] = []

  if (attempts.length === 0) return badges

  // Eagle Eye - 5 consecutive correct identifications
  const recentAttempts = attempts.slice(-5)
  if (recentAttempts.length === 5 && recentAttempts.every((a) => a.result === "safe")) {
    badges.push("Eagle Eye")
  }

  // Phish Hunter - Correctly identified 10 phishing attempts
  const phishingCorrect = attempts.filter((a) => a.result === "safe" && a.action === "reported").length
  if (phishingCorrect >= 10) {
    badges.push("Phish Hunter")
  }

  // Security Pro - 90% success rate over 20+ attempts
  if (attempts.length >= 20) {
    const successRate = attempts.filter((a) => a.result === "safe").length / attempts.length
    if (successRate >= 0.9) {
      badges.push("Security Pro")
    }
  }

  // Quick Draw - Average response time under 10 seconds
  const avgResponseTime = attempts.reduce((sum, a) => sum + a.timeToDecisionMs, 0) / attempts.length
  if (avgResponseTime < 10000 && attempts.length >= 10) {
    badges.push("Quick Draw")
  }

  return badges
}

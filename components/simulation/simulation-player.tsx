"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Scenario } from "@/types"
import { EmailView } from "./email-view"
import { SmsView } from "./sms-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface SimulationPlayerProps {
  scenario: Scenario
}

export function SimulationPlayer({ scenario }: SimulationPlayerProps) {
  const [startTime] = useState(Date.now())
  const [isCompleted, setIsCompleted] = useState(false)
  const router = useRouter()

  const handleAction = async (action: "reported" | "clicked" | "ignored") => {
    const timeToDecision = Date.now() - startTime

    // Calculate result based on scenario and action
    let result: "safe" | "unsafe"
    let pointsAwarded = 0

    if (scenario.answerKey.isPhish) {
      // This is a phishing attempt
      if (action === "reported") {
        result = "safe"
        pointsAwarded = scenario.points
      } else {
        result = "unsafe"
        pointsAwarded = 0
      }
    } else {
      // This is legitimate
      if (action === "reported") {
        result = "unsafe"
        pointsAwarded = 0
      } else {
        result = "safe"
        pointsAwarded = scenario.points
      }
    }

    // Create mock attempt data
    const attemptData = {
      id: `attempt-${Date.now()}`,
      userId: "mock-user",
      scenarioId: scenario.id,
      action,
      timeToDecisionMs: timeToDecision,
      result,
      pointsAwarded,
      createdAt: new Date(),
    }

    // Store in localStorage for demo purposes
    localStorage.setItem(`attempt-${attemptData.id}`, JSON.stringify(attemptData))

    // Navigate to results
    router.push(`/results/${attemptData.id}`)
  }

  if (isCompleted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-serif font-bold">Simulation Complete</h2>
              <p className="text-muted-foreground">Processing your response...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/training">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Training
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold">{scenario.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Difficulty: {scenario.difficulty}/5
              </span>
              <span>{scenario.points} points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {scenario.type === "email" ? <EmailView scenario={scenario} /> : <SmsView scenario={scenario} />}
        </div>

        {/* Action Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                What do you do?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => handleAction("reported")} variant="destructive" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Report as Phishing
              </Button>
              <Button onClick={() => handleAction("clicked")} variant="outline" className="w-full justify-start">
                Click the Link
              </Button>
              <Button onClick={() => handleAction("ignored")} variant="secondary" className="w-full justify-start">
                Ignore & Delete
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Hints to Look For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Check sender authenticity</li>
                <li>• Examine link destinations</li>
                <li>• Look for urgency tactics</li>
                <li>• Verify unexpected requests</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

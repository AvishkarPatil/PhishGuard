"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Attempt, Scenario } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Shield, AlertTriangle, Trophy, Clock, Target, Home, Play } from "lucide-react"
import { mockScenarios } from "@/data/scenarios"

interface ResultsDisplayProps {
  attemptId: string
}

export function ResultsDisplay({ attemptId }: ResultsDisplayProps) {
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get attempt data from localStorage (in real app, this would be from Firebase)
    const attemptData = localStorage.getItem(`attempt-${attemptId}`)
    if (attemptData) {
      const parsedAttempt = JSON.parse(attemptData)
      setAttempt(parsedAttempt)

      // Find the corresponding scenario
      const correspondingScenario = mockScenarios.find((s) => s.id === parsedAttempt.scenarioId)
      setScenario(correspondingScenario || null)
    }
    setLoading(false)
  }, [attemptId])

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading results...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!attempt || !scenario) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <XCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-2xl font-serif font-bold">Results Not Found</h2>
              <p className="text-muted-foreground">The simulation results could not be loaded.</p>
              <Link href="/training">
                <Button>Return to Training</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isSuccess = attempt.result === "safe"
  const timeInSeconds = Math.round(attempt.timeToDecisionMs / 1000)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          {isSuccess ? (
            <div className="p-4 bg-green-500/10 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          ) : (
            <div className="p-4 bg-destructive/10 rounded-full">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold">{isSuccess ? "Well Done!" : "Learning Opportunity"}</h1>
          <p className="text-lg text-muted-foreground">
            {isSuccess ? "You correctly identified this scenario" : "Let's learn from this experience"}
          </p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{attempt.pointsAwarded}</div>
            <p className="text-xs text-muted-foreground">out of {scenario.points} possible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeInSeconds}s</div>
            <p className="text-xs text-muted-foreground">
              {timeInSeconds < 10
                ? "Quick decision"
                : timeInSeconds < 30
                  ? "Thoughtful analysis"
                  : "Careful consideration"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Action</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{attempt.action}</div>
            <Badge variant={isSuccess ? "default" : "destructive"} className="mt-1">
              {isSuccess ? "Correct" : "Incorrect"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scenario Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Scenario Analysis
            </CardTitle>
            <CardDescription>
              Understanding what made this {scenario.answerKey.isPhish ? "phishing attempt" : "legitimate message"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant={scenario.answerKey.isPhish ? "destructive" : "default"}>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>This was {scenario.answerKey.isPhish ? "a phishing attempt" : "a legitimate message"}.</strong>
                {scenario.answerKey.isPhish
                  ? " It was designed to steal your information or compromise your security."
                  : " It came from a trusted source and was safe to interact with."}
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-semibold">Key Indicators:</h4>
              <ul className="space-y-2">
                {scenario.answerKey.redFlags.map((flag, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {scenario.phishSignalHints.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Warning Signs to Remember:</h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.phishSignalHints.map((hint, index) => (
                    <Badge key={index} variant="outline">
                      {hint}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Key Learning Points
            </CardTitle>
            <CardDescription>Essential cybersecurity knowledge from this scenario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <h5 className="font-medium mb-2">Best Practices:</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Always verify sender authenticity</li>
                  <li>• Check URLs before clicking links</li>
                  <li>• Be suspicious of urgent requests</li>
                  <li>• When in doubt, report it</li>
                </ul>
              </div>

              {!isSuccess && (
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h5 className="font-medium mb-2 text-destructive">What to do differently:</h5>
                  <p className="text-sm text-muted-foreground">
                    {scenario.answerKey.isPhish
                      ? "This was a phishing attempt. The safest action would have been to report it as suspicious."
                      : "This was a legitimate message. Reporting it as phishing could cause unnecessary concern."}
                  </p>
                </div>
              )}

              {isSuccess && (
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h5 className="font-medium mb-2 text-green-600">Excellent work!</h5>
                  <p className="text-sm text-muted-foreground">
                    You correctly identified this scenario. Your cybersecurity awareness is improving!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Progress</CardTitle>
          <CardDescription>Continue training to improve your security awareness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Security Awareness Level</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <p className="text-sm text-muted-foreground">
            Complete more scenarios to reach expert level and unlock new badges.
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/training">
          <Button size="lg" className="w-full sm:w-auto">
            <Play className="h-4 w-4 mr-2" />
            Continue Training
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
            <Home className="h-4 w-4 mr-2" />
            View Dashboard
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
            <Trophy className="h-4 w-4 mr-2" />
            See Leaderboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

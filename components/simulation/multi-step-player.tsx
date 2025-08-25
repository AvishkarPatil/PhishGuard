"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { EnhancedScenario, SimulationAttempt } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  BookOpen,
  Target,
  CheckCircle,
  Trophy,
  Clock,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Shield,
} from "lucide-react"
import { EmailView } from "./email-view"
import { SmsView } from "./sms-view"
import { BrowserView } from "./browser-view"
import { toast } from "@/hooks/use-toast"

interface MultiStepPlayerProps {
  scenario: EnhancedScenario
}

export function MultiStepPlayer({ scenario }: MultiStepPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [attempt, setAttempt] = useState<SimulationAttempt | null>(null)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [startTime] = useState(Date.now())
  const [hintsUsed, setHintsUsed] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Initialize attempt
    const newAttempt: SimulationAttempt = {
      id: `attempt-${Date.now()}`,
      userId: "demo-user",
      scenarioId: scenario.id,
      startedAt: new Date(),
      currentStep: 0,
      responses: {},
      score: 0,
      timeBonus: 0,
      totalPoints: 0,
      mistakes: 0,
      hintsUsed: 0,
    }
    setAttempt(newAttempt)
  }, [scenario.id])

  const currentStepData = scenario.steps[currentStep]
  const progress = ((currentStep + 1) / scenario.steps.length) * 100

  const handleNext = () => {
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeSimulation()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    const step = currentStepData
    if (step.type === "quiz") {
      const options = step.options || []
      const selectedOption = options[answerIndex]
      const isCorrect = typeof selectedOption === 'string' ? 
        answerIndex === step.correctAnswer : 
        selectedOption?.isCorrect || false
      
      const explanation = typeof selectedOption === 'string' ? 
        step.explanation : 
        selectedOption?.explanation || step.explanation
      
      const newResponses = {
        ...responses,
        [step.id]: { answer: answerIndex, correct: isCorrect, timestamp: Date.now() },
      }
      setResponses(newResponses)

      if (isCorrect) {
        toast({
          title: "Correct! 🎉",
          description: explanation,
          duration: 3000,
        })
      } else {
        toast({
          title: "Not quite right",
          description: explanation,
          variant: "destructive",
          duration: 4000,
        })
        setAttempt((prev) => (prev ? { ...prev, mistakes: prev.mistakes + 1 } : null))
      }

      // Auto-advance after showing explanation
      setTimeout(() => {
        handleNext()
      }, 2000)
    }
  }

  const useHint = () => {
    setHintsUsed(hintsUsed + 1)
    setAttempt((prev) => (prev ? { ...prev, hintsUsed: prev.hintsUsed + 1 } : null))
    toast({
      title: "💡 Hint",
      description: "Look for urgency tactics, suspicious domains, and requests for sensitive information.",
      duration: 5000,
    })
  }

  const completeSimulation = () => {
    if (!attempt) return

    const timeElapsed = Date.now() - startTime
    const timeBonus = Math.max(0, scenario.points * 0.5 - (timeElapsed / 60000) * 10) // Bonus decreases over time
    const correctAnswers = Object.values(responses).filter((r) => r.correct).length
    const totalQuestions = scenario.steps.filter((s) => s.type === "quiz").length
    const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 1
    const baseScore = Math.round(scenario.points * accuracy)
    const finalScore = Math.round(baseScore + timeBonus - hintsUsed * 10)

    const completedAttempt = {
      ...attempt,
      completedAt: new Date(),
      currentStep: scenario.steps.length,
      responses,
      score: baseScore,
      timeBonus: Math.round(timeBonus),
      totalPoints: Math.max(0, finalScore),
      hintsUsed,
    }

    // Store attempt
    localStorage.setItem(`attempt-${completedAttempt.id}`, JSON.stringify(completedAttempt))

    // Navigate to results
    router.push(`/results/${completedAttempt.id}`)
  }

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case "intro":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Play className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{currentStepData.title}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {currentStepData.content}
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {scenario.estimatedTime} min
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                {scenario.points} points
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Level {scenario.difficulty}
              </div>
            </div>
          </div>
        )

      case "lesson":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">{currentStepData.content}</p>
            </div>
          </div>
        )

      case "interactive":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            </div>
            {currentStepData.component === "email" && (
              <EmailView
                scenario={{
                  ...currentStepData.data,
                  id: "interactive",
                  type: "email",
                  title: currentStepData.title,
                  difficulty: scenario.difficulty,
                  points: 0,
                  answerKey: { isPhish: true, redFlags: [] },
                }}
              />
            )}
            {currentStepData.component === "sms" && (
              <SmsView
                scenario={{
                  ...currentStepData.data,
                  id: "interactive",
                  type: "sms",
                  title: currentStepData.title,
                  difficulty: scenario.difficulty,
                  points: 0,
                  smsText: currentStepData.data.message,
                  answerKey: { isPhish: true, redFlags: [] },
                }}
              />
            )}
            {currentStepData.component === "browser" && <BrowserView data={currentStepData.data} />}
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            </div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">{currentStepData.question}</h3>
                <div className="space-y-3">
                  {currentStepData.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4 bg-transparent"
                      onClick={() => handleQuizAnswer(index)}
                      disabled={responses[currentStepData.id]}
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mr-3 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {typeof option === 'string' ? option : option.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "completion":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{currentStepData.title}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {currentStepData.content}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Shield className="h-4 w-4 mr-1" />
                Security Expert
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Trophy className="h-4 w-4 mr-1" />+{scenario.points} Points
              </Badge>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!attempt) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{scenario.title}</h1>
              {scenario.isIndianContext && (
                <Badge variant="outline" className="text-xs">
                  🇮🇳 Indian Context
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={useHint} disabled={currentStepData.type === "completion"}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Hint ({hintsUsed})
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {scenario.steps.length}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStepData.type !== "quiz" && (
              <Button onClick={handleNext}>
                {currentStep === scenario.steps.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

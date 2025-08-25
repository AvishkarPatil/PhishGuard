"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { EnhancedScenario, SimulationAttempt, QuizOption } from "@/types"
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
  Brain,
  AlertTriangle,
  Search,
  Microscope,
  Globe,
  Lock,
  Flag,
  Zap,
  Eye,
  Award,
} from "lucide-react"
import { EmailView } from "./email-view"
import { SmsView } from "./sms-view"
import { BrowserView } from "./browser-view"
import { toast } from "@/hooks/use-toast"

interface EnhancedSimulationPlayerProps {
  scenario: EnhancedScenario
}

export function EnhancedSimulationPlayer({ scenario }: EnhancedSimulationPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [attempt, setAttempt] = useState<SimulationAttempt | null>(null)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [startTime] = useState(Date.now())
  const [hintsUsed, setHintsUsed] = useState(0)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const router = useRouter()

  const currentStep = scenario.steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / scenario.steps.length) * 100

  useEffect(() => {
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

  const findStepIndex = (stepId: string): number => {
    return scenario.steps.findIndex(step => step.id === stepId)
  }

  const handleNext = () => {
    if (currentStep.nextStepId) {
      const nextIndex = findStepIndex(currentStep.nextStepId)
      if (nextIndex !== -1) {
        setCurrentStepIndex(nextIndex)
      } else {
        completeSimulation()
      }
    } else if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      completeSimulation()
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    const step = currentStep
    if (step.type === "quiz") {
      const options = step.options || []
      const selectedOption = options[answerIndex]
      
      let isCorrect = false
      let explanation = ""
      
      if (typeof selectedOption === 'string') {
        isCorrect = answerIndex === step.correctAnswer
        explanation = step.explanation || ""
      } else {
        const quizOption = selectedOption as QuizOption
        isCorrect = quizOption.isCorrect
        explanation = quizOption.explanation || ""
      }
      
      const newResponses = {
        ...responses,
        [step.id]: { 
          answer: answerIndex, 
          correct: isCorrect, 
          timestamp: Date.now(),
          explanation 
        },
      }
      setResponses(newResponses)

      if (isCorrect) {
        setScore(score + 50)
        toast({
          title: "Correct!",
          description: explanation,
        })
      } else {
        setMistakes(mistakes + 1)
        toast({
          title: "Incorrect",
          description: explanation,
          variant: "destructive",
        })
      }

      setTimeout(() => {
        handleNext()
      }, 2500)
    }
  }

  const useHint = () => {
    setHintsUsed(hintsUsed + 1)
    const hintMessages = [
      "Look for urgency tactics and pressure to act quickly",
      "Check sender domains carefully - are they official?",
      "Real organizations never ask for sensitive info via unsolicited messages",
      "When in doubt, verify through official channels independently"
    ]
    
    toast({
      title: "Security Hint",
      description: hintMessages[hintsUsed % hintMessages.length],
    })
  }

  const completeSimulation = () => {
    if (!attempt) return

    const timeElapsed = Date.now() - startTime
    const timeBonus = Math.max(0, scenario.points * 0.3 - (timeElapsed / 60000) * 5)
    const correctAnswers = Object.values(responses).filter((r) => r.correct).length
    const totalQuestions = scenario.steps.filter((s) => s.type === "quiz").length
    const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 1
    const baseScore = Math.round(scenario.points * accuracy)
    const finalScore = Math.round(baseScore + timeBonus - hintsUsed * 10 - mistakes * 15)

    const completedAttempt = {
      ...attempt,
      completedAt: new Date(),
      currentStep: scenario.steps.length,
      responses,
      score: baseScore,
      timeBonus: Math.round(timeBonus),
      totalPoints: Math.max(0, finalScore),
      hintsUsed,
      mistakes,
    }

    localStorage.setItem(`attempt-${completedAttempt.id}`, JSON.stringify(completedAttempt))
    
    toast({
      title: "Training Complete!",
      description: `You earned ${Math.max(0, finalScore)} points! Great work on completing the security training.`,
    })
    
    setTimeout(() => {
      router.push('/training')
    }, 3000)
  }

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case "intro": return <Play className="h-6 w-6" />
      case "lesson": return <BookOpen className="h-6 w-6" />
      case "interactive": return <Target className="h-6 w-6" />
      case "quiz": return <Brain className="h-6 w-6" />
      case "completion": return <Trophy className="h-6 w-6" />
      default: return <Shield className="h-6 w-6" />
    }
  }

  const getStepColor = (stepType: string) => {
    switch (stepType) {
      case "intro": return "bg-blue-500/10 text-blue-500"
      case "lesson": return "bg-green-500/10 text-green-500"
      case "interactive": return "bg-orange-500/10 text-orange-500"
      case "quiz": return "bg-purple-500/10 text-purple-500"
      case "completion": return "bg-yellow-500/10 text-yellow-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  const getStepTitleIcon = (title: string) => {
    if (title.includes("Investigation") || title.includes("Lab")) return <Search className="h-7 w-7" />
    if (title.includes("Forensics") || title.includes("Analysis")) return <Microscope className="h-7 w-7" />
    if (title.includes("Domain") || title.includes("Technical")) return <Globe className="h-7 w-7" />
    if (title.includes("Security") || title.includes("Mechanics")) return <Lock className="h-7 w-7" />
    if (title.includes("Red Flag") || title.includes("Assessment")) return <Flag className="h-7 w-7" />
    if (title.includes("Psychology") || title.includes("Deep Dive")) return <Brain className="h-7 w-7" />
    if (title.includes("Challenge") || title.includes("Expert")) return <Zap className="h-7 w-7" />
    if (title.includes("Verification") || title.includes("Protocol")) return <Eye className="h-7 w-7" />
    if (title.includes("Certified") || title.includes("Complete")) return <Award className="h-7 w-7" />
    return <Shield className="h-7 w-7" />
  }

  const formatContent = (content: string | undefined) => {
    if (!content) return <p className="text-lg text-muted-foreground leading-relaxed"></p>
    // Check if content contains numbered points
    if (content.includes('1)') || content.includes('2)') || content.includes('3)')) {
      const parts = content.split(/(?=\d+\))/)
      const intro = parts[0].trim()
      const points = parts.slice(1).filter(p => p.trim())
      
      return (
        <div className="space-y-4">
          {intro && <p className="text-lg text-muted-foreground leading-relaxed">{intro}</p>}
          <ol className="space-y-3 ml-4">
            {points.map((point, index) => {
              const cleanPoint = point.replace(/^\d+\)\s*/, '').trim()
              return (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{cleanPoint}</span>
                </li>
              )
            })}
          </ol>
        </div>
      )
    }
    
    return <p className="text-lg text-muted-foreground leading-relaxed">{content}</p>
  }

  const renderStepContent = () => {
    switch (currentStep.type) {
      case "intro":
        return (
          <div className="text-center space-y-8">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${getStepColor(currentStep.type)}`}>
              {getStepIcon(currentStep.type)}
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-4">
                {getStepTitleIcon(currentStep.title)}
                {currentStep.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {currentStep.content}
              </p>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {scenario.estimatedTime} minutes
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                {scenario.points} points
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Level {scenario.difficulty}
              </div>
            </div>
            {scenario.tags && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {scenario.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )

      case "lesson":
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getStepColor(currentStep.type)}`}>
                {getStepIcon(currentStep.type)}
              </div>
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  {getStepTitleIcon(currentStep.title)}
                  {currentStep.title}
                </h2>
                <p className="text-muted-foreground">Learning Module</p>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              {formatContent(currentStep.content || "")}
            </div>
            {currentStep.aiGuidance && (
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">AI Security Assistant</h4>
                    <p className="text-blue-800 dark:text-blue-200">{currentStep.aiGuidance}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "interactive":
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getStepColor(currentStep.type)}`}>
                {getStepIcon(currentStep.type)}
              </div>
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  {getStepTitleIcon(currentStep.title)}
                  {currentStep.title}
                </h2>
                <p className="text-muted-foreground">Interactive Analysis</p>
              </div>
            </div>
            
            {currentStep.component === "email" && (
              <EmailView
                scenario={{
                  ...currentStep.data,
                  id: "interactive",
                  type: "email",
                  title: currentStep.title,
                  difficulty: scenario.difficulty,
                  points: 0,
                  answerKey: { isPhish: true, redFlags: [] },
                }}
              />
            )}
            {currentStep.component === "sms" && (
              <SmsView
                scenario={{
                  ...currentStep.data,
                  id: "interactive",
                  type: "sms",
                  title: currentStep.title,
                  difficulty: scenario.difficulty,
                  points: 0,
                  smsText: currentStep.data.message,
                  answerKey: { isPhish: true, redFlags: [] },
                }}
              />
            )}
            {currentStep.component === "browser" && <BrowserView data={currentStep.data} />}
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getStepColor(currentStep.type)}`}>
                {getStepIcon(currentStep.type)}
              </div>
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  {getStepTitleIcon(currentStep.title)}
                  {currentStep.title}
                </h2>
                <p className="text-muted-foreground">Knowledge Assessment</p>
              </div>
            </div>
            
            <Card className="border-2">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-6">
                  {currentStep.question || currentStep.content}
                </h3>
                <div className="space-y-4">
                  {currentStep.options?.map((option, index) => {
                    const isAnswered = responses[currentStep.id]
                    const isSelected = isAnswered && responses[currentStep.id].answer === index
                    const isCorrect = isAnswered && responses[currentStep.id].correct && isSelected
                    const isIncorrect = isAnswered && !responses[currentStep.id].correct && isSelected
                    
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full justify-start text-left h-auto p-6 transition-all ${
                          isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950/20' :
                          isIncorrect ? 'border-red-500 bg-red-50 dark:bg-red-950/20' :
                          'bg-transparent hover:bg-muted/50'
                        }`}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={isAnswered}
                      >
                        <span className={`w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center mr-4 flex-shrink-0 ${
                          isCorrect ? 'bg-green-500 text-white' :
                          isIncorrect ? 'bg-red-500 text-white' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-base">
                          {typeof option === 'string' ? option : option.text}
                        </span>
                        {isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "completion":
        return (
          <div className="text-center space-y-8">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${getStepColor(currentStep.type)}`}>
              {getStepIcon(currentStep.type)}
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-4">
                {getStepTitleIcon(currentStep.title)}
                {currentStep.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {currentStep.content}
              </p>
            </div>
            <div className="flex items-center justify-center gap-6">
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Shield className="h-5 w-5 mr-2" />
                Expert Level Achieved
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Trophy className="h-5 w-5 mr-2" />
                +{scenario.points} Points
              </Badge>
            </div>
            {currentStep.aiGuidance && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">AI Security Assistant</h4>
                    <p className="text-green-800 dark:text-green-200">{currentStep.aiGuidance}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Initializing advanced simulation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{scenario.title}</h1>
              {scenario.region === "india" && (
                <Badge variant="outline" className="text-xs">
                  Indian Context
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {scenario.category.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Score: <span className="font-semibold text-primary">{score}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={useHint} 
                disabled={currentStep.type === "completion"}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Hint ({hintsUsed})
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {scenario.steps.length}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-10">
              {renderStepContent()}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentStepIndex === 0}
              className="px-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {scenario.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index < currentStepIndex ? 'bg-green-500' :
                    index === currentStepIndex ? 'bg-primary' :
                    'bg-muted'
                  }`}
                />
              ))}
            </div>

            {currentStep.type !== "quiz" && currentStep.type !== "completion" && (
              <Button onClick={handleNext} className="px-6">
                {currentStepIndex === scenario.steps.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            
            {currentStep.type === "completion" && (
              <Button onClick={() => router.push('/training')} className="px-6">
                Back to Training
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Target, 
  Brain,
  Shield,
  AlertTriangle,
  Award,
  RotateCcw,
  ChevronRight,
  Play
} from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "beginner" | "intermediate" | "expert"
  category: string
}

const assessmentQuestions: Question[] = [
  {
    id: "q1",
    question: "You receive an email from your bank asking you to verify your account by clicking a link. The email looks official with proper logos. What should you do?",
    options: [
      "Click the link immediately to verify your account",
      "Call the bank using the number from their official website to verify",
      "Reply to the email asking for more information",
      "Forward the email to friends to ask their opinion"
    ],
    correctAnswer: 1,
    explanation: "Always verify suspicious communications through official channels. Banks never ask for verification via email links.",
    difficulty: "beginner",
    category: "Email Security"
  },
  {
    id: "q2",
    question: "What is the PRIMARY red flag in this UPI message: 'Congratulations! You've won ₹5,000. Enter your UPI PIN to claim: bit.ly/claim5k'?",
    options: [
      "The amount is too large",
      "It uses a shortened URL",
      "It asks for UPI PIN to receive money",
      "It's an unsolicited message"
    ],
    correctAnswer: 2,
    explanation: "You NEVER need to enter UPI PIN to receive money. PIN is only for sending money, never for receiving.",
    difficulty: "beginner",
    category: "UPI Security"
  },
  {
    id: "q3",
    question: "A job offer email from 'TCS' asks for ₹5,000 security deposit. The email has professional formatting and company logos. What's the biggest red flag?",
    options: [
      "The professional formatting looks suspicious",
      "Legitimate companies never ask candidates for money",
      "The amount is too high for a security deposit",
      "The email doesn't mention interview process"
    ],
    correctAnswer: 1,
    explanation: "Golden rule: Real employers NEVER ask candidates for money. This applies globally to all legitimate companies.",
    difficulty: "intermediate",
    category: "Employment Fraud"
  },
  {
    id: "q4",
    question: "You receive a call claiming to be from Income Tax Department demanding immediate payment of ₹25,000 in penalties. They threaten arrest if not paid within 2 hours. What should you do?",
    options: [
      "Pay immediately to avoid arrest",
      "Ask for their employee ID and department details",
      "Hang up and verify through official IT website/helpline",
      "Negotiate for a lower amount"
    ],
    correctAnswer: 2,
    explanation: "Government agencies never demand immediate payments over phone calls. Always verify through official channels.",
    difficulty: "intermediate",
    category: "Government Impersonation"
  },
  {
    id: "q5",
    question: "An email from 'support@amazon-security.com' says your account is compromised and asks you to download an attachment to secure it. What's wrong here?",
    options: [
      "Amazon's official domain is 'amazon.com', not 'amazon-security.com'",
      "Amazon never sends security attachments",
      "The email should come from '@amazon.com'",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Multiple red flags: fake domain, suspicious attachment, and Amazon uses '@amazon.com' for official communications.",
    difficulty: "expert",
    category: "Domain Analysis"
  },
  {
    id: "q6",
    question: "What's the safest way to handle a suspicious QR code poster offering 'Free WiFi' at an airport?",
    options: [
      "Scan it quickly since it's at an official location",
      "Check if other people are using it first",
      "Use airport's official WiFi through their website instead",
      "Scan but don't enter any personal information"
    ],
    correctAnswer: 2,
    explanation: "QR codes can be easily tampered with. Always use official WiFi through legitimate channels provided by the venue.",
    difficulty: "expert",
    category: "Physical Security"
  },
  {
    id: "q7",
    question: "Your friend excitedly shows you a 'guaranteed' cryptocurrency investment promising 300% returns in 30 days. What's your response?",
    options: [
      "Invest a small amount to test it",
      "Ask for more details about the investment",
      "Warn them it's likely a Ponzi scheme and help them research",
      "Ignore it completely"
    ],
    correctAnswer: 2,
    explanation: "300% returns in 30 days is mathematically impossible for legitimate investments. Help friends avoid obvious scams.",
    difficulty: "expert",
    category: "Investment Fraud"
  },
  {
    id: "q8",
    question: "You receive a WhatsApp message: 'Hi Mom, my phone broke. I'm in hospital after accident. Need ₹25,000 urgently. Don't call, I'm in ICU.' What should you do?",
    options: [
      "Send money immediately - it's an emergency",
      "Ask personal questions only family would know",
      "Call your child's actual phone number immediately",
      "Ask for hospital details first"
    ],
    correctAnswer: 2,
    explanation: "Always verify through known contact methods. Real emergencies don't prevent verification calls.",
    difficulty: "intermediate",
    category: "Family Emergency Scam"
  },
  {
    id: "q9",
    question: "An email claims you've won £750,000 in UK National Lottery. You never bought a ticket. The email asks for ₹5,000 processing fee. What's the primary issue?",
    options: [
      "The processing fee is too high",
      "You cannot win a lottery you never entered",
      "The amount seems unrealistic",
      "It's from a foreign country"
    ],
    correctAnswer: 1,
    explanation: "Fundamental rule: You cannot win a lottery you never participated in. This is classic advance fee fraud.",
    difficulty: "beginner",
    category: "Lottery Scam"
  },
  {
    id: "q10",
    question: "Which domain is legitimate for State Bank of India's online banking?",
    options: [
      "sbi-online.co.in",
      "onlinesbi.sbi",
      "sbi-banking.gov.in",
      "statebankofindia.com"
    ],
    correctAnswer: 1,
    explanation: "SBI's official online banking domain is 'onlinesbi.sbi'. Always verify official domains through bank's main website.",
    difficulty: "intermediate",
    category: "Banking Security"
  }
]

export default function SkillAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [testStarted, setTestStarted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitTest()
    }
  }, [timeLeft, testStarted, showResults])

  const startTest = () => {
    setTestStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setTimeLeft(600)
    setScore(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmitTest()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    let correctAnswers = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === assessmentQuestions[index].correctAnswer) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setShowResults(true)
  }

  const getScoreGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100" }
    if (percentage >= 80) return { grade: "A", color: "text-green-600", bg: "bg-green-100" }
    if (percentage >= 70) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" }
    if (percentage >= 60) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { grade: "F", color: "text-red-600", bg: "bg-red-100" }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold">Cybersecurity Skill Assessment</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive evaluation of your cybersecurity awareness and threat detection skills
              </p>
            </div>

            {/* Test Overview */}
            <Card className="mb-8 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Assessment Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{assessmentQuestions.length}</div>
                    <div className="text-sm text-blue-700">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-green-700">Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">70%</div>
                    <div className="text-sm text-purple-700">Pass Score</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">Mixed</div>
                    <div className="text-sm text-orange-700">Difficulty</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Categories */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Assessment Categories</CardTitle>
                <CardDescription>Topics covered in this comprehensive evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Email Security", "UPI Security", "Employment Fraud", "Government Impersonation", "Domain Analysis", "Physical Security", "Investment Fraud", "Family Emergency Scam", "Lottery Scam", "Banking Security"].map((category) => (
                    <div key={category} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Read each question carefully and select the best answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>You can navigate between questions using Previous/Next buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>The test will auto-submit when time expires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>You'll receive detailed explanations for each question after completion</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button onClick={startTest} size="lg" className="px-8 py-4 text-lg">
                <Play className="h-5 w-5 mr-2" />
                Start Assessment
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const { grade, color, bg } = getScoreGrade(score, assessmentQuestions.length)
    const percentage = Math.round((score / assessmentQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Assessment Complete!</h1>
              <p className="text-lg text-muted-foreground">Here's how you performed</p>
            </div>

            {/* Score Overview */}
            <Card className="mb-8 border-2">
              <CardContent className="pt-8">
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${bg} mb-4`}>
                    <span className={`text-3xl font-bold ${color}`}>{grade}</span>
                  </div>
                  <div className="text-4xl font-bold mb-2">{score}/{assessmentQuestions.length}</div>
                  <div className="text-xl text-muted-foreground">{percentage}% Correct</div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{score}</div>
                    <div className="text-sm text-green-700">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">{assessmentQuestions.length - score}</div>
                    <div className="text-sm text-red-700">Incorrect Answers</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{formatTime(600 - timeLeft)}</div>
                    <div className="text-sm text-blue-700">Time Taken</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Detailed Results</CardTitle>
                <CardDescription>Review your answers and learn from explanations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assessmentQuestions.map((question, index) => {
                    const userAnswer = selectedAnswers[index]
                    const isCorrect = userAnswer === question.correctAnswer
                    
                    return (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">Question {index + 1}</span>
                              <Badge variant="outline" className="text-xs">{question.category}</Badge>
                              <Badge variant={question.difficulty === 'beginner' ? 'secondary' : question.difficulty === 'intermediate' ? 'default' : 'destructive'} className="text-xs">
                                {question.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm mb-3">{question.question}</p>
                            <div className="space-y-1 text-sm">
                              <div className={`p-2 rounded ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                <span className="font-medium">Your answer: </span>
                                {question.options[userAnswer] || "Not answered"}
                              </div>
                              {!isCorrect && (
                                <div className="p-2 rounded bg-green-50 border border-green-200">
                                  <span className="font-medium">Correct answer: </span>
                                  {question.options[question.correctAnswer]}
                                </div>
                              )}
                              <div className="p-2 rounded bg-blue-50 border border-blue-200">
                                <span className="font-medium">Explanation: </span>
                                {question.explanation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="text-center space-x-4">
              <Button onClick={() => setTestStarted(false)} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
              <Button onClick={() => window.location.href = '/training'}>
                Continue Training
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Test Interface
  const question = assessmentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Cybersecurity Assessment</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {assessmentQuestions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeLeft < 60 ? 'text-red-600 font-semibold' : ''}>{formatTime(timeLeft)}</span>
              </div>
              <Badge variant="outline">{question.category}</Badge>
              <Badge variant={question.difficulty === 'beginner' ? 'secondary' : question.difficulty === 'intermediate' ? 'default' : 'destructive'}>
                {question.difficulty}
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-4 whitespace-normal"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mr-3 flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {selectedAnswers.filter(a => a !== undefined).length} of {assessmentQuestions.length} answered
            </div>

            <Button 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === assessmentQuestions.length - 1 ? "Submit Test" : "Next"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
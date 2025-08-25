export interface UserProfile {
  uid: string
  email: string
  displayName?: string
  role: "user" | "admin"
  scoreTotal: number
  riskLevel: "Low" | "Medium" | "High"
  completedScenarioIds: string[]
  badges: string[]
  createdAt: Date
  lastActive: Date
}

export interface Scenario {
  id: string
  type: "email" | "sms"
  title: string
  difficulty: 1 | 2 | 3 | 4 | 5
  points: number
  fromName?: string
  fromAddress?: string
  subject?: string
  bodyHtml?: string
  linkUrl?: string
  smsText?: string
  phishSignalHints: string[]
  answerKey: {
    isPhish: boolean
    redFlags: string[]
  }
}

export interface Attempt {
  id: string
  userId: string
  scenarioId: string
  action: "reported" | "clicked" | "ignored"
  timeToDecisionMs: number
  result: "safe" | "unsafe"
  pointsAwarded: number
  createdAt: Date
}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface SimulationStep {
  id: string
  type: "intro" | "scenario" | "lesson" | "interactive" | "quiz" | "completion"
  title: string
  content?: string
  question?: string
  options?: QuizOption[] | string[]
  correctAnswer?: number
  explanation?: string
  component?: "email" | "sms" | "browser" | "audio-player"
  data?: any
  nextStepId?: string
  aiGuidance?: string
}

export interface EnhancedScenario extends Scenario {
  category: "upi" | "banking" | "ecommerce" | "festival" | "aadhaar" | "employment" | "social-engineering" | "qr-code" | "voice-phishing" | "general"
  region?: string
  isIndianContext?: boolean
  steps: SimulationStep[]
  estimatedTime: number
  prerequisites?: string[]
  tags: string[]
  callerInfo?: {
    number: string
    name: string
    isSpam: boolean
  }
  audioScript?: string
  qrCodeData?: string
  posterText?: string
}

export interface UserStats {
  totalAttempts: number
  successRate: number
  currentStreak: number
  longestStreak: number
  averageResponseTime: number
  categoriesCompleted: string[]
  weakAreas: string[]
  strongAreas: string[]
  lastActivity: Date
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  requirements: string
  unlockedAt?: Date
}

export interface SimulationAttempt {
  id: string
  userId: string
  scenarioId: string
  startedAt: Date
  completedAt?: Date
  currentStep: number
  responses: Record<string, any>
  score: number
  timeBonus: number
  totalPoints: number
  mistakes: number
  hintsUsed: number
}

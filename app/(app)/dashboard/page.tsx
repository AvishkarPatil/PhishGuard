"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Target, Trophy, Play, TrendingUp, CheckCircle, Award } from "lucide-react"
import { RecentActivityChart } from "@/components/dashboard/recent-activity-chart"
import { RiskMeter } from "@/components/dashboard/risk-meter"
import { AchievementShowcase } from "@/components/achievement-showcase"
import { AnalyticsWidget } from "@/components/analytics-widget"
import { PageSkeleton } from "@/components/loading/page-skeleton"
import { useAuth } from "@/lib/AuthContext"
import { getUser, getUserAttempts } from "@/lib/firestore"

// Mock user data - in real app this would come from Firebase
const mockUserData = {
  uid: "user-123",
  email: "user@example.com",
  displayName: "Security Trainee",
  scoreTotal: 1250,
  riskLevel: "Low" as const,
  completedScenarioIds: ["s1-email-payroll", "s2-email-legit", "s3-sms-delivery"],
  badges: ["Eagle Eye", "Phish Hunter"],
  recentAttempts: [
    { date: "2024-01-15", score: 100, result: "safe" },
    { date: "2024-01-14", score: 150, result: "safe" },
    { date: "2024-01-13", score: 0, result: "unsafe" },
    { date: "2024-01-12", score: 50, result: "safe" },
    { date: "2024-01-11", score: 100, result: "safe" },
    { date: "2024-01-10", score: 150, result: "safe" },
    { date: "2024-01-09", score: 100, result: "safe" },
  ],
  weeklyProgress: {
    thisWeek: 450,
    lastWeek: 270,
    improvement: 67,
  },
  streakData: {
    current: 5,
    best: 8,
  },
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadUserData = async () => {
      // Skip during build time
      if (typeof window === 'undefined') {
        setUserData(mockUserData)
        setIsLoading(false)
        return
      }
      
      if (!user) {
        setUserData(mockUserData)
        setIsLoading(false)
        return
      }
      
      try {
        setIsLoading(true)
        
        // Get user profile
        const profile = await getUser(user.uid)
        if (profile) {
          // Get user attempts for activity chart
          const attempts = await getUserAttempts(user.uid)
          
          const userData = {
            ...profile,
            recentAttempts: attempts.slice(0, 7).map(attempt => ({
              date: attempt.timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
              score: attempt.score || 0,
              result: attempt.result || 'safe'
            })),
            weeklyProgress: {
              thisWeek: profile.scoreTotal || 0,
              lastWeek: Math.max(0, (profile.scoreTotal || 0) - 200),
              improvement: 15
            },
            streakData: {
              current: 5,
              best: 8
            }
          }
          
          setUserData(userData)
        } else {
          // Fallback to mock data if no profile found
          setUserData({
            ...mockUserData,
            displayName: 'Demo User',
            email: 'demo@phishguard.com'
          })
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        // Always provide fallback data
        setUserData({
          ...mockUserData,
          displayName: 'Demo User',
          email: 'demo@phishguard.com'
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [user])

  const completionRate = userData?.completedScenarioIds ? Math.round((userData.completedScenarioIds.length / 5) * 100) : 0
  const successRate = userData?.recentAttempts ? Math.round(
    (userData.recentAttempts.filter((a) => a.result === "safe").length / userData.recentAttempts.length) * 100,
  ) : 0

  if (isLoading || !userData) {
    return <PageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Shield className="h-4 w-4" />
              Personal Analytics
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Security Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome back, {userData?.displayName || 'User'}! Track your phishing awareness progress and improve your cybersecurity skills
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{(userData?.scoreTotal || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />+{userData?.weeklyProgress?.improvement || 0}% from last week
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{userData?.riskLevel || 'Medium'}</div>
            <p className="text-xs text-muted-foreground">Excellent security awareness</p>
            <div className="mt-2">
              <RiskMeter level={userData?.riskLevel || 'Medium'} />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scenarios Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData?.completedScenarioIds?.length || 0}/5</div>
            <p className="text-xs text-muted-foreground">{completionRate}% completion rate</p>
            <Progress value={completionRate} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">Last 7 attempts</p>
            <div className="flex gap-1 mt-2">
              {(userData?.recentAttempts || []).slice(0, 7).map((attempt, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${attempt.result === "safe" ? "bg-green-500" : "bg-destructive"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your performance over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivityChart data={userData?.recentAttempts || []} />
            </CardContent>
          </Card>
          <AnalyticsWidget />
        </div>

        <div className="space-y-6">
          {/* Current Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">{userData?.streakData?.current || 0}</div>
                <p className="text-sm text-muted-foreground">Correct identifications in a row</p>
                <div className="text-xs text-muted-foreground">Best streak: {userData?.streakData?.best || 0}</div>
              </div>
            </CardContent>
          </Card>

          <AchievementShowcase />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continue Training</CardTitle>
            <CardDescription>Resume your phishing awareness training with new scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/training">
              <Button className="w-full" size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start Training Session
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View Leaderboard</CardTitle>
            <CardDescription>See how you rank against other security trainees</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/leaderboard">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Trophy className="h-4 w-4 mr-2" />
                Check Rankings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}

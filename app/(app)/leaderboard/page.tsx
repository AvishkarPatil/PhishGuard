"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  TrendingUp, 
  Users, 
  Target,
  Flame,
  Star,
  Zap,
  Shield,
  Calendar,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getLeaderboard } from "@/lib/firestore"

const mockLeaderboardData = [
  {
    rank: 1,
    name: "Anuj",
    email: "anuj@tkiet.edu",
    score: 2850,
    badge: "Security Expert",
    riskLevel: "Low",
    completedScenarios: 15,
    successRate: 96,
    weeklyGain: 320,
    streak: 12,
    isCurrentUser: false,
    country: "🇮🇳",
    department: "IT Security"
  },
  {
    rank: 2,
    name: "Vaibhavi",
    email: "vaibhavi@tkiet.edu",
    score: 2640,
    badge: "Phish Hunter",
    riskLevel: "Low",
    completedScenarios: 14,
    successRate: 94,
    weeklyGain: 280,
    streak: 8,
    isCurrentUser: false,
    country: "🇮🇳",
    department: "Finance"
  },
  {
    rank: 3,
    name: "Avi",
    email: "avi@mail.com",
    score: 2420,
    badge: "Eagle Eye",
    riskLevel: "Low",
    completedScenarios: 13,
    successRate: 91,
    weeklyGain: 240,
    streak: 15,
    isCurrentUser: false,
    country: "🇮🇳",
    department: "Operations"
  },
  {
    rank: 4,
    name: "Security Trainee",
    email: "user@example.com",
    score: 1250,
    badge: "Phish Hunter",
    riskLevel: "Low",
    completedScenarios: 8,
    successRate: 88,
    weeklyGain: 180,
    streak: 5,
    isCurrentUser: true,
    country: "🇮🇳",
    department: "Development"
  },
  {
    rank: 5,
    name: "Emma Wilson",
    email: "emma.w@company.com",
    score: 1180,
    badge: "Security Aware",
    riskLevel: "Medium",
    completedScenarios: 7,
    successRate: 85,
    weeklyGain: 150,
    streak: 3,
    isCurrentUser: false,
    country: "🇬🇧",
    department: "Marketing"
  }
]

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("global")

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setIsLoading(true)
        const data = await getLeaderboard()
        if (data && data.length > 0) {
          setLeaderboardData(data)
        } else {
          setLeaderboardData(mockLeaderboardData)
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error)
        setLeaderboardData(mockLeaderboardData)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadLeaderboard()
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-slate-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">#{rank}</span>
          </div>
        )
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-500 bg-green-100 dark:bg-green-900/20"
      case "Medium": return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20"
      case "High": return "text-red-500 bg-red-100 dark:bg-red-900/20"
      default: return "text-slate-500 bg-slate-100 dark:bg-slate-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentUser = leaderboardData.find((user) => user.isCurrentUser)
  const topUsers = leaderboardData.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Trophy className="h-4 w-4" />
              Global Competition
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Security Champions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compete globally, learn together, and become a cybersecurity expert through gamified training
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Podium Section */}
        <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Hall of Fame
            </CardTitle>
            <CardDescription>Top 3 cybersecurity champions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-center gap-12 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-16 bg-gradient-to-t from-slate-300 to-slate-400 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <Avatar className="w-16 h-16 absolute -top-8 left-2 border-4 border-white shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                      {topUsers[1]?.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold text-lg">{topUsers[1]?.name}</h3>
                <p className="text-2xl font-bold text-slate-600">{topUsers[1]?.score.toLocaleString()}</p>
                <Badge variant="secondary" className="mt-2">{topUsers[1]?.badge}</Badge>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-20 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-end justify-center pb-2">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <Avatar className="w-20 h-20 absolute -top-10 left-2 border-4 border-yellow-400 shadow-xl">
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold text-lg">
                      {topUsers[0]?.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-bold text-xl">{topUsers[0]?.name}</h3>
                <p className="text-3xl font-bold text-yellow-600">{topUsers[0]?.score.toLocaleString()}</p>
                <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">{topUsers[0]?.badge}</Badge>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-12 bg-gradient-to-t from-amber-500 to-amber-600 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <Avatar className="w-16 h-16 absolute -top-8 left-2 border-4 border-white shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold">
                      {topUsers[2]?.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold text-lg">{topUsers[2]?.name}</h3>
                <p className="text-2xl font-bold text-amber-600">{topUsers[2]?.score.toLocaleString()}</p>
                <Badge variant="secondary" className="mt-2">{topUsers[2]?.badge}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different leaderboards */}
        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Week
            </TabsTrigger>
            <TabsTrigger value="department" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Department
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Global Rankings
                </CardTitle>
                <CardDescription>Complete leaderboard with detailed performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <div
                      key={user.rank}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                        user.isCurrentUser 
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-blue-950/20 dark:to-purple-950/20 dark:border-blue-800" 
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      )}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar & Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-600 text-white font-bold">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                            <span className="text-lg">{user.country}</span>
                            {user.isCurrentUser && (
                              <Badge variant="default" className="text-xs">You</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span>{user.department}</span>
                            <div className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-orange-500" />
                              <span>{user.streak} day streak</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {user.score.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Points</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {user.successRate}%
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Success</div>
                        </div>

                        <div className="text-center">
                          <Badge className={cn("text-xs", getRiskColor(user.riskLevel))}>
                            {user.riskLevel}
                          </Badge>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-semibold">+{user.weeklyGain}</span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">This week</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Weekly Rankings</h3>
                  <p className="text-slate-600 dark:text-slate-400">Weekly leaderboard resets every Monday</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="department">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Department Rankings</h3>
                  <p className="text-slate-600 dark:text-slate-400">Compare with your department colleagues</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Rise in the Rankings?</h3>
                <p className="text-blue-100 max-w-md mx-auto">
                  Complete more training scenarios and climb your way to the top of the leaderboard!
                </p>
              </div>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <Trophy className="h-5 w-5 mr-2" />
                Start Training Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
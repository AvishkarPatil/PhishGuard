"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/toast"
import { AlertDialog } from "@/components/ui/alert-dialog"
import {
  Shield,
  Trophy,
  Target,
  Calendar,
  Share2,
  Settings,
  TrendingUp,
  Clock,
  Star,
  Gift,
  Users,
  Copy,
  CheckCircle,
  AlertTriangle,
  Brain,
  Flame,
} from "lucide-react"

export default function ProfilePage() {
  const [copiedReferral, setCopiedReferral] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { addToast } = useToast()

  const copyReferralCode = () => {
    navigator.clipboard.writeText("PHISH-JD2024")
    setCopiedReferral(true)
    setTimeout(() => setCopiedReferral(false), 2000)
    addToast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
      type: "success"
    })
  }

  const handleDeleteAccount = () => {
    addToast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted",
      type: "error"
    })
  }

  const handleSaveProfile = () => {
    addToast({
      title: "Profile Saved",
      description: "Your profile changes have been saved successfully",
      type: "success"
    })
  }

  const seasonalEvents = [
    {
      name: "Cybersecurity Awareness Month",
      description: "Special October challenges with bonus rewards",
      progress: 65,
      reward: "Exclusive 'Cyber Guardian' badge",
      timeLeft: "12 days left",
      icon: Shield,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Festival Scam Alert",
      description: "Diwali-themed phishing scenarios",
      progress: 30,
      reward: "500 bonus points",
      timeLeft: "5 days left",
      icon: Gift,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const predictiveChallenges = [
    {
      title: "Voice Phishing Mastery",
      description: "You've shown weakness in voice-based attacks. Complete 3 scenarios to improve.",
      difficulty: "Medium",
      estimatedTime: "15 min",
      points: 150,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      title: "QR Code Security",
      description: "Trending attack vector - 40% increase this week. Stay ahead of threats.",
      difficulty: "Hard",
      estimatedTime: "20 min",
      points: 200,
      icon: TrendingUp,
      color: "text-red-500",
    },
    {
      title: "Social Engineering Defense",
      description: "Personalized training based on your LinkedIn activity patterns.",
      difficulty: "Expert",
      estimatedTime: "25 min",
      points: 300,
      icon: Brain,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Profile Header */}
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src="https://i.ibb.co/YzbR4Kc/avi.jpg" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-white">
                    AP
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Avishkar Patil</h1>
                    <p className="text-muted-foreground mb-2">Security Trainee • TKIET, Kolhapur</p>
                    <p className="text-sm text-muted-foreground">Joined August 2025 • TKIET, Kolhapur</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Flame className="w-3 h-3 mr-1" />
                      7-day streak
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Star className="w-3 h-3 mr-1" />
                      Elite Member
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      <Trophy className="w-3 h-3 mr-1" />
                      Top 5%
                    </Badge>
                  </div>
                </div>
              </div>



              <div className="flex gap-3 ml-auto">
                <Button variant="outline" size="sm" onClick={handleSaveProfile}>
                  <Settings className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Events</TabsTrigger>
            <TabsTrigger value="predictive">AI Challenges</TabsTrigger>
            <TabsTrigger value="referral">Referral Program</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Security Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Security Awareness</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Low Risk
                  </Badge>
                </div>
                <Progress value={85} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Excellent! You've correctly identified 94% of threats. Only 1 unsafe action in the last 10 attempts.
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Completed 'UPI Festival Scam' simulation",
                      points: "+75",
                      time: "2 hours ago",
                      type: "success",
                    },
                    {
                      action: "Earned 'Voice Detective' badge",
                      points: "+150",
                      time: "1 day ago",
                      type: "achievement",
                    },
                    {
                      action: "Completed QR Code Security challenge",
                      points: "+100",
                      time: "2 days ago",
                      type: "success",
                    },
                    {
                      action: "Started Cybersecurity Awareness Month event",
                      points: "+25",
                      time: "3 days ago",
                      type: "event",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "success"
                              ? "bg-green-500"
                              : activity.type === "achievement"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-green-500 font-semibold">{activity.points}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Badges & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "First Steps",
                      description: "Complete your first simulation",
                      earned: true,
                      rarity: "Common",
                    },
                    {
                      name: "Eagle Eye",
                      description: "Identify 10 phishing attempts correctly",
                      earned: true,
                      rarity: "Uncommon",
                    },
                    {
                      name: "Streak Master",
                      description: "Maintain a 7-day learning streak",
                      earned: true,
                      rarity: "Rare",
                    },
                    {
                      name: "Voice Detective",
                      description: "Master voice phishing simulations",
                      earned: true,
                      rarity: "Epic",
                    },
                    {
                      name: "QR Guardian",
                      description: "Complete all QR code scenarios",
                      earned: false,
                      rarity: "Rare",
                    },
                    {
                      name: "Social Shield",
                      description: "Master social engineering defense",
                      earned: false,
                      rarity: "Legendary",
                    },
                  ].map((badge, index) => (
                    <Card
                      key={index}
                      className={`p-4 transition-all duration-300 hover:scale-105 ${
                        badge.earned
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              badge.earned ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
                            }`}
                          >
                            <Trophy className="w-6 h-6" />
                          </div>
                          <Badge variant={badge.earned ? "default" : "secondary"} className="text-xs">
                            {badge.rarity}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Seasonal Events & Limited-Time Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {seasonalEvents.map((event, index) => (
                  <Card key={index} className="p-6 bg-gradient-to-r from-card to-card/50">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${event.color}`}>
                        <event.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{event.name}</h3>
                          <Badge variant="outline">{event.timeLeft}</Badge>
                        </div>
                        <p className="text-muted-foreground">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{event.progress}%</span>
                          </div>
                          <Progress value={event.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary">Reward: {event.reward}</p>
                          <Button size="sm">Continue</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Powered Predictive Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictiveChallenges.map((challenge, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-muted ${challenge.color}`}>
                        <challenge.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{challenge.difficulty}</Badge>
                            <span className="text-sm text-muted-foreground">{challenge.estimatedTime}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary">+{challenge.points} points</span>
                          <Button size="sm">
                            Start Challenge
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Invite Friends, Earn Rewards</h3>
                  <p className="text-muted-foreground mb-4">
                    Get 100 points for each friend who joins and completes their first simulation
                  </p>
                  <div className="flex items-center justify-center gap-4 p-4 bg-card rounded-lg border">
                    <span className="font-mono text-lg">PHISH-JD2024</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyReferralCode}
                      className="flex items-center gap-2 bg-transparent"
                    >
                      {copiedReferral ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedReferral ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Friends Invited</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-secondary mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Successfully Joined</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-green-500 mb-1">300</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                </div>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Recent Referrals</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah M.", status: "Completed first simulation", points: "+100", date: "2 days ago" },
                      { name: "Raj P.", status: "Signed up", points: "Pending", date: "5 days ago" },
                      { name: "Mike L.", status: "Completed first simulation", points: "+100", date: "1 week ago" },
                    ].map((referral, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-sm text-muted-foreground">{referral.status}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${referral.points === "Pending" ? "text-muted-foreground" : "text-green-500"}`}
                          >
                            {referral.points}
                          </p>
                          <p className="text-xs text-muted-foreground">{referral.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Threat Detection by Category</h4>
                    <div className="space-y-3">
                      {[
                        { category: "Email Phishing", accuracy: 95, attempts: 12 },
                        { category: "SMS Scams", accuracy: 88, attempts: 8 },
                        { category: "Voice Phishing", accuracy: 75, attempts: 5 },
                        { category: "QR Code Scams", accuracy: 60, attempts: 3 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.category}</span>
                            <span>
                              {item.accuracy}% ({item.attempts} attempts)
                            </span>
                          </div>
                          <Progress value={item.accuracy} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Learning Streak</h4>
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-primary">7</div>
                      <p className="text-muted-foreground">Days in a row</p>
                      <div className="flex justify-center gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-primary rounded-full" />
                        ))}
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-muted rounded-full" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Keep going! 3 more days for the "Perfect Week" badge
                      </p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleDeleteAccount}
        confirmText="Delete Account"
        variant="destructive"
      />
    </div>
  )
}

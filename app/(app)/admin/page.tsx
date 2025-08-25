"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Target, AlertTriangle, Settings, BarChart3, Database } from "lucide-react"
import { ScenarioManager } from "@/components/admin/scenario-manager"
import { CreateScenarioForm } from "@/components/admin/create-scenario-form"
import { UserAnalytics } from "@/components/admin/user-analytics"
import { mockScenarios } from "@/data/scenarios"
import { seedDatabase } from "@/lib/seed-data"
import { useToast } from "@/components/ui/toast"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSeeding, setIsSeeding] = useState(false)
  const { addToast } = useToast()

  const handleSeedDatabase = async () => {
    setIsSeeding(true)
    try {
      await seedDatabase()
      addToast({
        title: "Success!",
        description: "Database seeded with sample data",
        type: "success"
      })
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to seed database",
        type: "error"
      })
    } finally {
      setIsSeeding(false)
    }
  }

  // Mock admin stats
  const adminStats = {
    totalUsers: 47,
    activeScenarios: mockScenarios.length,
    completedAttempts: 234,
    averageSuccessRate: 87,
    newUsersThisWeek: 12,
    scenariosCreatedThisWeek: 3,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Settings className="h-4 w-4" />
              Admin Panel
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage phishing scenarios, monitor user progress, and analyze security training effectiveness
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

      {/* Admin Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{adminStats.newUsersThisWeek} this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scenarios</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.activeScenarios}</div>
            <p className="text-xs text-muted-foreground">+{adminStats.scenariosCreatedThisWeek} this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Attempts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.completedAttempts}</div>
            <p className="text-xs text-muted-foreground">Across all scenarios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.averageSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Platform average</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Recent Scenario Activity
                </CardTitle>
                <CardDescription>Latest user interactions with training scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Alex Chen", scenario: "Payroll Update Required", result: "safe", time: "2 min ago" },
                    { user: "Sarah Johnson", scenario: "UPI Cashback Scam", result: "safe", time: "5 min ago" },
                    { user: "Mike Rodriguez", scenario: "Package Delivery SMS", result: "unsafe", time: "8 min ago" },
                    { user: "Emma Wilson", scenario: "Aadhaar KYC Update", result: "safe", time: "12 min ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{activity.user}</div>
                        <div className="text-sm text-muted-foreground">{activity.scenario}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={activity.result === "safe" ? "default" : "destructive"}>
                          {activity.result}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setActiveTab("create")}
                  className="w-full justify-start"
                  variant="outline"
                  size="lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Scenario
                </Button>
                <Button
                  onClick={() => setActiveTab("scenarios")}
                  className="w-full justify-start"
                  variant="outline"
                  size="lg"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Manage Scenarios
                </Button>
                <Button
                  onClick={() => setActiveTab("analytics")}
                  className="w-full justify-start"
                  variant="outline"
                  size="lg"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  onClick={handleSeedDatabase}
                  className="w-full justify-start"
                  variant="outline"
                  size="lg"
                  disabled={isSeeding}
                >
                  <Database className="h-4 w-4 mr-2" />
                  {isSeeding ? "Seeding..." : "Seed Firebase Database"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenarioManager />
        </TabsContent>

        <TabsContent value="create">
          <CreateScenarioForm />
        </TabsContent>

        <TabsContent value="analytics">
          <UserAnalytics />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}

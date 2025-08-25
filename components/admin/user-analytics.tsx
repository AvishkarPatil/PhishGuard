"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, AlertTriangle, Target, Award } from "lucide-react"

export function UserAnalytics() {
  // Mock analytics data
  const analyticsData = {
    userPerformance: [
      { name: "Alex Chen", score: 2850, successRate: 96, riskLevel: "Low", attempts: 15 },
      { name: "Sarah Johnson", score: 2640, successRate: 94, riskLevel: "Low", attempts: 14 },
      { name: "Mike Rodriguez", score: 2420, successRate: 91, riskLevel: "Low", attempts: 13 },
      { name: "Emma Wilson", score: 1180, successRate: 85, riskLevel: "Medium", attempts: 7 },
      { name: "David Kim", score: 980, successRate: 78, riskLevel: "Medium", attempts: 6 },
    ],
    scenarioStats: [
      { title: "Payroll Update Required", attempts: 45, successRate: 87, avgTime: 23 },
      { title: "UPI Cashback Scam", attempts: 42, successRate: 91, avgTime: 18 },
      { title: "Package Delivery SMS", attempts: 38, successRate: 83, avgTime: 31 },
      { title: "Aadhaar KYC Update", attempts: 35, successRate: 79, avgTime: 28 },
      { title: "Legitimate Security Alert", attempts: 33, successRate: 94, avgTime: 15 },
    ],
    riskDistribution: {
      low: 28,
      medium: 15,
      high: 4,
    },
    weeklyTrends: {
      newUsers: 12,
      completedScenarios: 156,
      averageScore: 1847,
      improvementRate: 23,
    },
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-500"
      case "Medium":
        return "text-yellow-500"
      case "High":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.weeklyTrends.newUsers}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scenarios Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.weeklyTrends.completedScenarios}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.weeklyTrends.averageScore}</div>
            <p className="text-xs text-muted-foreground">Platform average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.weeklyTrends.improvementRate}%</div>
            <p className="text-xs text-muted-foreground">Week over week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Users with highest security awareness scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.userPerformance.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.attempts} scenarios • {user.successRate}% success rate
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-primary">{user.score.toLocaleString()}</div>
                    <Badge variant="outline" className={getRiskColor(user.riskLevel)}>
                      {user.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Current security awareness levels across all users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-500">Low Risk</span>
                <span className="text-sm text-muted-foreground">{analyticsData.riskDistribution.low} users</span>
              </div>
              <Progress value={(analyticsData.riskDistribution.low / 47) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-500">Medium Risk</span>
                <span className="text-sm text-muted-foreground">{analyticsData.riskDistribution.medium} users</span>
              </div>
              <Progress value={(analyticsData.riskDistribution.medium / 47) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-500">High Risk</span>
                <span className="text-sm text-muted-foreground">{analyticsData.riskDistribution.high} users</span>
              </div>
              <Progress value={(analyticsData.riskDistribution.high / 47) * 100} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>{analyticsData.riskDistribution.high} users need additional training</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Performance</CardTitle>
          <CardDescription>How users are performing on each training scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.scenarioStats.map((scenario, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{scenario.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {scenario.attempts} attempts • Avg. {scenario.avgTime}s response time
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold">{scenario.successRate}%</div>
                  <div className="text-sm text-muted-foreground">Success rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

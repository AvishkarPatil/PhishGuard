"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Building } from "lucide-react"

const departmentData = [
  {
    name: "IT Security",
    score: 92,
    trend: "up",
    change: 8,
    users: 24
  },
  {
    name: "Finance",
    score: 87,
    trend: "up",
    change: 5,
    users: 18
  },
  {
    name: "HR",
    score: 84,
    trend: "down",
    change: -2,
    users: 12
  },
  {
    name: "Operations",
    score: 79,
    trend: "up",
    change: 12,
    users: 31
  },
  {
    name: "Marketing",
    score: 76,
    trend: "up",
    change: 3,
    users: 15
  }
]

export function AnalyticsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Department Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {departmentData.map((dept, index) => (
            <div key={dept.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium">{dept.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {dept.users}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold">{dept.score}%</div>
                <Badge variant={dept.trend === "up" ? "default" : "destructive"} className="text-xs">
                  {dept.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(dept.change)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
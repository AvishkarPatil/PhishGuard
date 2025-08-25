"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, TrendingUp, TrendingDown } from "lucide-react"

interface RiskAssessmentProps {
  riskLevel: "Low" | "Medium" | "High"
  riskScore: number
  recentTrend: "improving" | "declining" | "stable"
  vulnerabilities: string[]
  strengths: string[]
}

export function RiskAssessment({ riskLevel, riskScore, recentTrend, vulnerabilities, strengths }: RiskAssessmentProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case "Low":
        return "text-green-500"
      case "Medium":
        return "text-yellow-500"
      case "High":
        return "text-red-500"
    }
  }

  const getTrendIcon = () => {
    switch (recentTrend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <Shield className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Security Risk Assessment</span>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <Badge variant={riskLevel === "Low" ? "default" : riskLevel === "Medium" ? "secondary" : "destructive"}>
              {riskLevel} Risk
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Security Score</span>
            <span className={`font-medium ${getRiskColor()}`}>{riskScore}/100</span>
          </div>
          <Progress value={riskScore} className="h-2" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium text-red-500 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Areas for Improvement
            </h4>
            <ul className="space-y-1">
              {vulnerabilities.map((vulnerability, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  {vulnerability}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-green-500 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Your Strengths
            </h4>
            <ul className="space-y-1">
              {strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

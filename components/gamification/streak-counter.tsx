"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  lastActivity?: Date
}

export function StreakCounter({ currentStreak, longestStreak, lastActivity }: StreakCounterProps) {
  const [streakStatus, setStreakStatus] = useState<"active" | "at-risk" | "broken">("active")

  useEffect(() => {
    if (!lastActivity) return

    const hoursSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60)

    if (hoursSinceActivity > 48) {
      setStreakStatus("broken")
    } else if (hoursSinceActivity > 24) {
      setStreakStatus("at-risk")
    } else {
      setStreakStatus("active")
    }
  }, [lastActivity])

  const getStreakColor = () => {
    switch (streakStatus) {
      case "active":
        return "text-orange-500"
      case "at-risk":
        return "text-yellow-500"
      case "broken":
        return "text-gray-400"
    }
  }

  const getStreakMessage = () => {
    switch (streakStatus) {
      case "active":
        return "Keep it up!"
      case "at-risk":
        return "Don't break your streak!"
      case "broken":
        return "Start a new streak today"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Security Streak</CardTitle>
        <Flame className={`h-4 w-4 ${getStreakColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{currentStreak}</div>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Best: {longestStreak} days</span>
            <Badge variant={streakStatus === "active" ? "default" : "secondary"} className="text-xs">
              {getStreakMessage()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

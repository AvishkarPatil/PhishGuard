"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Shield, Target, Zap, Award, Lock } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first training scenario",
    icon: Shield,
    earned: true,
    progress: 100,
    rarity: "common"
  },
  {
    id: 2,
    name: "Phish Hunter",
    description: "Identify 10 phishing attempts correctly",
    icon: Target,
    earned: true,
    progress: 100,
    rarity: "uncommon"
  },
  {
    id: 3,
    name: "Eagle Eye",
    description: "Achieve 95% accuracy in 5 consecutive scenarios",
    icon: Trophy,
    earned: true,
    progress: 100,
    rarity: "rare"
  },
  {
    id: 4,
    name: "Speed Demon",
    description: "Complete a scenario in under 30 seconds",
    icon: Zap,
    earned: false,
    progress: 60,
    rarity: "uncommon"
  },
  {
    id: 5,
    name: "Security Expert",
    description: "Complete all advanced training scenarios",
    icon: Award,
    earned: false,
    progress: 30,
    rarity: "legendary"
  },
  {
    id: 6,
    name: "Perfect Score",
    description: "Get 100% in skill assessment",
    icon: Trophy,
    earned: false,
    progress: 0,
    rarity: "epic"
  }
]

export function AchievementShowcase() {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-600 bg-gray-100"
      case "uncommon": return "text-green-600 bg-green-100"
      case "rare": return "text-blue-600 bg-blue-100"
      case "epic": return "text-purple-600 bg-purple-100"
      case "legendary": return "text-yellow-600 bg-yellow-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const earnedCount = achievements.filter(a => a.earned).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
          <Badge variant="secondary">
            {earnedCount}/{achievements.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? "border-primary/20 bg-primary/5"
                    : "border-muted bg-muted/30 opacity-60"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={`p-1 rounded ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}>
                    {achievement.earned ? (
                      <Icon className="h-4 w-4 text-primary" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{achievement.name}</h4>
                    <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {achievement.description}
                </p>
                {!achievement.earned && (
                  <div className="space-y-1">
                    <Progress value={achievement.progress} className="h-1" />
                    <p className="text-xs text-muted-foreground">{achievement.progress}% complete</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
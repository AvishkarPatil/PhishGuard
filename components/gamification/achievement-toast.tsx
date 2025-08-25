"use client"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Trophy, Shield, Target, Zap } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: "trophy" | "shield" | "target" | "zap"
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface AchievementToastProps {
  achievement: Achievement
  onShow?: () => void
}

export function AchievementToast({ achievement, onShow }: AchievementToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    const getIcon = () => {
      switch (achievement.icon) {
        case "trophy":
          return Trophy
        case "shield":
          return Shield
        case "target":
          return Target
        case "zap":
          return Zap
        default:
          return Trophy
      }
    }

    const getRarityColor = () => {
      switch (achievement.rarity) {
        case "common":
          return "text-gray-500"
        case "rare":
          return "text-blue-500"
        case "epic":
          return "text-purple-500"
        case "legendary":
          return "text-yellow-500"
        default:
          return "text-gray-500"
      }
    }

    const Icon = getIcon()

    toast({
      variant: "default",
      title: (
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${getRarityColor()}`} />
          <span>Achievement Unlocked!</span>
        </div>
      ),
      description: (
        <div>
          <p className="font-medium">{achievement.name}</p>
          <p className="text-sm opacity-90">{achievement.description}</p>
        </div>
      ),
      duration: 5000,
    })

    onShow?.()
  }, [achievement, toast, onShow])

  return null
}

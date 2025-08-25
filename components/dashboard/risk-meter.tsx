"use client"

import { cn } from "@/lib/utils"

interface RiskMeterProps {
  level: "Low" | "Medium" | "High"
}

export function RiskMeter({ level }: RiskMeterProps) {
  const getColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getWidth = (level: string) => {
    switch (level) {
      case "Low":
        return "w-1/4"
      case "Medium":
        return "w-2/4"
      case "High":
        return "w-3/4"
      default:
        return "w-0"
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Safe</span>
        <span>At Risk</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-500", getColor(level), getWidth(level))} />
      </div>
    </div>
  )
}

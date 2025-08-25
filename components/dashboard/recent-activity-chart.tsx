"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ActivityData {
  date: string
  score: number
  result: "safe" | "unsafe"
}

interface RecentActivityChartProps {
  data: ActivityData[]
}

export function RecentActivityChart({ data }: RecentActivityChartProps) {
  const chartData = data
    .map((item, index) => ({
      day: `Day ${data.length - index}`,
      score: item.score,
      success: item.result === "safe" ? 1 : 0,
    }))
    .reverse()

  return (
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#6b7280"
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 0, r: 5 }}
            activeDot={{ r: 7, fill: "#3b82f6", strokeWidth: 2, stroke: "#ffffff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

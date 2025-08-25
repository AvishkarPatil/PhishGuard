"use client"

export function ActivityHeatmap() {
  // Generate mock heatmap data for 35 days (5 weeks)
  const heatmapData = Array.from({ length: 35 }, (_, i) => {
    const intensity = Math.floor(Math.random() * 5) // 0-4 intensity levels
    return intensity
  })

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return "bg-slate-100 dark:bg-slate-800"
      case 1: return "bg-green-200 dark:bg-green-900"
      case 2: return "bg-green-300 dark:bg-green-800"
      case 3: return "bg-green-400 dark:bg-green-700"
      case 4: return "bg-green-500 dark:bg-green-600"
      default: return "bg-slate-100 dark:bg-slate-800"
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">30-Day Activity</h4>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1 ml-2 mr-2">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-2 h-2 rounded-sm ${getColorClass(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {heatmapData.map((intensity, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-sm ${getColorClass(intensity)} border border-slate-200 dark:border-slate-700`}
            title={`Day ${index + 1}: ${intensity === 0 ? 'No activity' : `${intensity} activities`}`}
          />
        ))}
      </div>
    </div>
  )
}
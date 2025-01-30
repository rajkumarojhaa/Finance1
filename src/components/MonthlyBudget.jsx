import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MonthlyBudget({ used, total, accountName }) {
  const percentage = Math.round((used / total) * 100)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Monthly Budget ({accountName})</CardTitle>
          <span className="text-sm text-muted-foreground">
            ${used.toFixed(2)} of ${total.toFixed(2)} used
          </span>
        </div>
      </CardHeader>
      <CardContent>
  <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-200 rounded-full overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
      style={{ width: `${percentage}%` }}
    />
  </div>
  <div className="text-xs text-right mt-1 text-muted-foreground">
    {percentage}% used
  </div>
</CardContent>
    </Card>
  )
}


import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export function ExpenseBreakdown({ expenseData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="h-[200px] w-full">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={expenseData}
        cx="50%"
        cy="50%"
        outerRadius={80}
        dataKey="value"
      >
        {expenseData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</div>

        <div className="mt-4 flex items-center justify-center gap-4">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


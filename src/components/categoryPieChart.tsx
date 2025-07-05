"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { Transaction } from "@/types"
interface CategoryPieChartProps {
    transactions: Transaction[]
}
const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00ff00",
]
export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
    const categoryData = transactions.reduce(
        (acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
        return acc
        },
        {} as Record<string, number>,
    )
    const chartData = Object.entries(categoryData).map(([category, amount]) => ({
        name: category,
        value: amount,
    }))
    if (chartData.length === 0) {
        return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">No data available</p>
        </div>
        )
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        </PieChart>
        </ResponsiveContainer>
    )
}
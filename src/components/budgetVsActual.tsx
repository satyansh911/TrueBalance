"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Budget, Transaction } from "@/types"

interface BudgetVsActualChartProps {
    budgets: Budget[]
    transactions: Transaction[]
}

export function BudgetVsActualChart({ budgets, transactions }: BudgetVsActualChartProps) {
    const chartData = budgets.map((budget) => {
        const spent = transactions
        .filter((t) => t.category === budget.category && t.date.startsWith(budget.month))
        .reduce((sum, t) => sum + t.amount, 0)
        return {
        category: budget.category,
        budget: budget.amount,
        actual: spent,
        month: new Date(budget.month + "-01").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        }),
        }
    })
    if (chartData.length === 0) {
        return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">No budget data available</p>
        </div>
        )
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip
            formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name === "budget" ? "Budget" : "Actual"]}
            />
            <Legend />
            <Bar dataKey="budget" fill="hsl(var(--primary))" name="Budget" />
            <Bar dataKey="actual" fill="hsl(var(--destructive))" name="Actual" />
        </BarChart>
        </ResponsiveContainer>
    )
}

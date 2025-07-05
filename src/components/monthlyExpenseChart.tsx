"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Transaction } from "@/types"
interface MonthlyExpensesChartProps {
    transactions: Transaction[]
}
export function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
    const monthlyData = transactions.reduce(
        (acc, transaction) => {
        const month = transaction.date.slice(0, 7)
        acc[month] = (acc[month] || 0) + transaction.amount
        return acc
        },
        {} as Record<string, number>,
    )
    const chartData = Object.entries(monthlyData)
        .map(([month, amount]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        }),
        amount: amount,
        }))
        .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
        .slice(-6)
    if (chartData.length === 0) {
        return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">No data available</p>
        </div>
        )
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]} />
            <Bar dataKey="amount" fill="hsl(var(--primary))" />
        </BarChart>
        </ResponsiveContainer>
    )
}
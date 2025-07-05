"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Budget, Transaction } from "@/types"
import { TrendingUp, AlertTriangle } from "lucide-react"
interface SpendingInsightsProps {
    budgets: Budget[]
    transactions: Transaction[]
}
export function SpendingInsights({ budgets, transactions }: SpendingInsightsProps) {
    if (budgets.length === 0) {
        return (
        <div className="text-center py-4">
            <p className="text-muted-foreground">No budget data available for insights.</p>
        </div>
        )
    }
    const insights = budgets.map((budget) => {
        const spent = transactions
        .filter((t) => t.category === budget.category && t.date.startsWith(budget.month))
        .reduce((sum, t) => sum + t.amount, 0)
        const percentage = (spent / budget.amount) * 100
        const remaining = budget.amount - spent
        return {
        category: budget.category,
        budget: budget.amount,
        spent,
        percentage,
        remaining,
        status: percentage >= 100 ? "over" : percentage >= 80 ? "warning" : "good",
        }
    })
    const overBudgetCategories = insights.filter((i) => i.status === "over")
    const warningCategories = insights.filter((i) => i.status === "warning")
    const totalBudget = insights.reduce((sum, i) => sum + i.budget, 0)
    const totalSpent = insights.reduce((sum, i) => sum + i.spent, 0)
    return (
        <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            </div>
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
        </div>
        {overBudgetCategories.length > 0 && (
            <div className="space-y-2">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">Over Budget</span>
            </div>
            {overBudgetCategories.map((insight) => (
                <div key={insight.category} className="flex items-center justify-between text-sm">
                <span>{insight.category}</span>
                <Badge variant="destructive">${Math.abs(insight.remaining).toFixed(2)} over</Badge>
                </div>
            ))}
            </div>
        )}
        {warningCategories.length > 0 && (
            <div className="space-y-2">
            <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">Near Budget Limit</span>
            </div>
            {warningCategories.map((insight) => (
                <div key={insight.category} className="flex items-center justify-between text-sm">
                <span>{insight.category}</span>
                <Badge variant="secondary">${insight.remaining.toFixed(2)} left</Badge>
                </div>
            ))}
            </div>
        )}
        <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
            💡 Tip: Consider adjusting your spending in over-budget categories or increase your budget allocation.
            </p>
        </div>
        </div>
    )
}
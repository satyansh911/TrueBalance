"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Trash2 } from "lucide-react"
import type { Budget, Transaction } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BudgetListProps {
  budgets: Budget[]
  transactions: Transaction[]
  onEdit: (budget: Budget) => void
  onDelete: (id: string) => void
}

export function BudgetList({ budgets, transactions, onEdit, onDelete }: BudgetListProps) {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No budgets found.</p>
        <p className="text-sm text-muted-foreground mt-1">Add your first budget to start tracking your spending.</p>
      </div>
    )
  }

  const getSpentAmount = (budget: Budget) => {
    return transactions
      .filter((t) => t.category === budget.category && t.date.startsWith(budget.month))
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => {
            const spent = getSpentAmount(budget)
            const percentage = (spent / budget.amount) * 100
            const remaining = budget.amount - spent

            return (
              <TableRow key={budget.id}>
                <TableCell className="font-medium">{budget.category}</TableCell>
                <TableCell>
                  {new Date(budget.month + "-01").toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>${budget.amount.toFixed(2)}</TableCell>
                <TableCell>${spent.toFixed(2)}</TableCell>
                <TableCell className="w-[200px]">
                  <div className="space-y-1">
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                    <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% used</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={percentage >= 100 ? "destructive" : percentage >= 80 ? "secondary" : "default"}>
                    {percentage >= 100 ? "Over Budget" : percentage >= 80 ? "Near Limit" : "On Track"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(budget)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(budget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

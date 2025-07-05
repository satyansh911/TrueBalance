"use client"

import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/types"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No recent transactions.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{transaction.category}</Badge>
            <div className="text-sm font-medium">${transaction.amount.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

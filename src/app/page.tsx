"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { MonthlyExpensesChart } from "@/components/monthlyExpenseChart"
import { CategoryPieChart } from "@/components/categoryPieChart"
import { RecentTransactions } from "@/components/recentTransactions"
import type { Transaction } from "@/types"
import { LottieSafeWrapper } from "@/components/lottie-safe-wrapper"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const transactionsRes = await fetch("/api/transactions")
      const transactionsData = await transactionsRes.json()
      setTransactions(transactionsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0)
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthlyExpenses = transactions
    .filter((t) => t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0)
  const categoryTotals = transactions.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    },
    {} as Record<string, number>,
  )
  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]?.[0] || "None"
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your personal finances</p>
        </div>
        <Button asChild>
          <Link href="/transactions">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <LottieSafeWrapper 
              src="/coin.json"
              size={24}
              autoplay={true}
              loop={true}
              fallbackIcon="🔍"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <LottieSafeWrapper 
              src="/calendar.json"
              size={24}
              autoplay={true}
              loop={true}
              fallbackIcon="🔍"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current month expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <LottieSafeWrapper 
              src="/pieChart.json"
              size={24}
              autoplay={true}
              loop={true}
              fallbackIcon="🔍"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topCategory}</div>
            <p className="text-xs text-muted-foreground">${(categoryTotals[topCategory] || 0).toFixed(2)} spent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <LottieSafeWrapper 
              src="/transactions.json"
              size={24}
              autoplay={true}
              loop={true}
              fallbackIcon="🔍"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">Total transactions</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
            <CardDescription>Your expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyExpensesChart transactions={transactions} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Breakdown of expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryPieChart transactions={transactions} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your most recent financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  )
}
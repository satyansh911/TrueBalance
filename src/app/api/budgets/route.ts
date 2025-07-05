import { type NextRequest, NextResponse } from "next/server"
import { BudgetModel } from "@/lib/models/budget"

export async function GET() {
  try {
    console.log("Fetching budgets...")
    const budgets = await BudgetModel.findAll()
    console.log(`Found ${budgets.length} budgets`)
    return NextResponse.json(budgets || [])
  } catch (error) {
    console.error("Error fetching budgets:", error)
    return NextResponse.json(
      { error: "Failed to fetch budgets", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Creating new budget...")
    const body = await request.json()
    console.log("Budget data:", body)

    // Basic validation
    if (!body.category || !body.amount || !body.month) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate amount is a number
    if (isNaN(Number(body.amount)) || Number(body.amount) <= 0) {
      return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 })
    }

    // Validate month format (YYYY-MM)
    if (!body.month.match(/^\d{4}-\d{2}$/)) {
      return NextResponse.json({ error: "Month must be in YYYY-MM format" }, { status: 400 })
    }

    const budgetData = {
      category: body.category,
      amount: Number(body.amount),
      month: body.month,
    }

    const newBudget = await BudgetModel.create(budgetData)
    console.log("Budget created successfully:", newBudget.id)
    return NextResponse.json(newBudget, { status: 201 })
  } catch (error) {
    console.error("Error creating budget:", error)
    return NextResponse.json(
      { error: "Failed to create budget", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

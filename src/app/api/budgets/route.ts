import { type NextRequest, NextResponse } from "next/server"
import { BudgetModel } from "@/lib/models/budget"

export async function GET() {
    try {
        const budgets = await BudgetModel.findAll()
        return NextResponse.json(budgets)
    } catch (error) {
        console.error("Error fetching budgets:", error)
        return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if (!body.category || !body.amount || !body.month) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }
        if (isNaN(Number(body.amount)) || Number(body.amount) <= 0) {
            return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 })
        }
        if (!body.month.match(/^\d{4}-\d{2}$/)) {
            return NextResponse.json({ error: "Month must be in YYYY-MM format" }, { status: 400 })
        }
        const budgetData = {
            category: body.category,
            amount: Number(body.amount),
            month: body.month,
        }
        const newBudget = await BudgetModel.create(budgetData)
        return NextResponse.json(newBudget, { status: 201 })
    } catch (error) {
        console.error("Error creating budget:", error)
        return NextResponse.json({ error: "Failed to create budget" }, { status: 500 })
    }
}
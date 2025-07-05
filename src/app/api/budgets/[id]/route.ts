import { type NextRequest, NextResponse } from "next/server"
import { BudgetModel } from "@/lib/models/budget"

interface BudgetUpdate {
    category?: string
    amount?: number
    month?: string
}

export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const id = url.pathname.split("/").pop() || ""
        const body = await request.json()
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ error: "Invalid budget ID" }, { status: 400 })
        }
        if (body.amount !== undefined && (isNaN(Number(body.amount)) || Number(body.amount) <= 0)) {
            return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 })
        }
        if (body.month && !body.month.match(/^\d{4}-\d{2}$/)) {
            return NextResponse.json({ error: "Month must be in YYYY-MM format" }, { status: 400 })
        }
        const updates: BudgetUpdate = {}
        if (body.category) updates.category = body.category
        if (body.amount !== undefined) updates.amount = Number(body.amount)
        if (body.month) updates.month = body.month
        const updatedBudget = await BudgetModel.updateById(id, updates)
        if (!updatedBudget) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 })
        }
        return NextResponse.json(updatedBudget)
    } catch (error) {
        console.error("Error updating budget:", error)
        return NextResponse.json({ error: "Failed to update budget" }, { status: 500 })
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const id = url.pathname.split("/").pop() || ""
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ error: "Invalid budget ID" }, { status: 400 })
        }
        const deleted = await BudgetModel.deleteById(id)
        if (!deleted) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Budget deleted successfully" })
    } catch (error) {
        console.error("Error deleting budget:", error)
        return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 })
    }
}
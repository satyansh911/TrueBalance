import { type NextRequest, NextResponse } from "next/server"
import { TransactionModel } from "@/lib/models/transaction"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    type TransactionUpdate = {
        amount?: number;
        date?: string;
        description?: string;
        category?: string;
    };
    try {
        const body = await request.json()
        if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 })
        }
        if (body.amount !== undefined && (isNaN(Number(body.amount)) || Number(body.amount) <= 0)) {
            return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 })
        }
        if (body.date && !Date.parse(body.date)) {
            return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
        }
        const updates: TransactionUpdate = {}
        if (body.amount !== undefined) updates.amount = Number(body.amount)
        if (body.date) updates.date = body.date
        if (body.description) updates.description = body.description.trim()
        if (body.category) updates.category = body.category
        const updatedTransaction = await TransactionModel.updateById(params.id, updates)
        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
        }
        return NextResponse.json(updatedTransaction)
    } catch (error) {
        console.error("Error updating transaction:", error)
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 })
        }
        const deleted = await TransactionModel.deleteById(params.id)
        if (!deleted) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Transaction deleted successfully" })
    } catch (error) {
        console.error("Error deleting transaction:", error)
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 })
    }
}
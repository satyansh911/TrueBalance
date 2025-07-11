import { type NextRequest, NextResponse } from "next/server"
import { TransactionModel } from "@/lib/models/transaction"

export async function GET() {
  try {
    const transactions = await TransactionModel.findAll()
    return NextResponse.json(transactions || [])
  } catch (error) {
    console.error("Error fetching transactions:", error)
    // Return empty array instead of error to prevent frontend crashes
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.amount || !body.date || !body.description || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate amount is a number
    if (isNaN(Number(body.amount)) || Number(body.amount) <= 0) {
      return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 })
    }

    // Validate date format
    if (!Date.parse(body.date)) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    const transactionData = {
      amount: Number(body.amount),
      date: body.date,
      description: body.description.trim(),
      category: body.category,
    }

    const newTransaction = await TransactionModel.create(transactionData)
    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}

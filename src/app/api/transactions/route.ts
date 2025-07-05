import { type NextRequest, NextResponse } from "next/server"
import { TransactionModel } from "@/lib/models/transaction"

export async function GET() {
  try {
    console.log("Fetching transactions...")
    const transactions = await TransactionModel.findAll()
    console.log(`Found ${transactions.length} transactions`)
    return NextResponse.json(transactions || [])
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Creating new transaction...")
    const body = await request.json()
    console.log("Transaction data:", body)

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
    console.log("Transaction created successfully:", newTransaction.id)
    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json(
      { error: "Failed to create transaction", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

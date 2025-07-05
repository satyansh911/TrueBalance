import { getDatabase } from "@/lib/mongodb"
import type { Transaction } from "@/types"
import { ObjectId } from "mongodb"

export class TransactionModel {
  private static async getCollection() {
    try {
      const db = await getDatabase()
      return db.collection<Omit<Transaction, "id"> & { _id?: ObjectId }>("transactions")
    } catch (error) {
      console.error("Failed to get transactions collection:", error)
      throw error
    }
  }

  static async findAll(): Promise<Transaction[]> {
    try {
      const collection = await this.getCollection()
      const transactions = await collection.find({}).sort({ date: -1 }).toArray()

      return transactions.map(({ _id, ...transaction }) => ({
        id: _id!.toString(),
        ...transaction,
      }))
    } catch (error) {
      console.error("Error finding transactions:", error)
      throw error
    }
  }

  static async create(transaction: Omit<Transaction, "id">): Promise<Transaction> {
    try {
      const collection = await this.getCollection()
      const result = await collection.insertOne(transaction)

      return {
        id: result.insertedId.toString(),
        ...transaction,
      }
    } catch (error) {
      console.error("Error creating transaction:", error)
      throw error
    }
  }

  static async findById(id: string): Promise<Transaction | null> {
    try {
      if (!ObjectId.isValid(id)) {
        return null
      }

      const collection = await this.getCollection()
      const transaction = await collection.findOne({ _id: new ObjectId(id) })

      if (!transaction) return null

      const { _id, ...transactionData } = transaction
      return {
        id: _id.toString(),
        ...transactionData,
      }
    } catch (error) {
      console.error("Error finding transaction by ID:", error)
      throw error
    }
  }

  static async updateById(id: string, updates: Partial<Omit<Transaction, "id">>): Promise<Transaction | null> {
    try {
      if (!ObjectId.isValid(id)) {
        return null
      }

      const collection = await this.getCollection()
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: "after" },
      )

      if (!result) return null

      const { _id, ...transactionData } = result
      return {
        id: _id.toString(),
        ...transactionData,
      }
    } catch (error) {
      console.error("Error updating transaction:", error)
      throw error
    }
  }

  static async deleteById(id: string): Promise<boolean> {
    try {
      if (!ObjectId.isValid(id)) {
        return false
      }

      const collection = await this.getCollection()
      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } catch (error) {
      console.error("Error deleting transaction:", error)
      throw error
    }
  }
}

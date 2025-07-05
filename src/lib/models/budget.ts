import { getDatabase } from "@/lib/mongodb"
import type { Budget } from "@/types"
import { ObjectId } from "mongodb"

export class BudgetModel {
  private static async getCollection() {
    try {
      const db = await getDatabase()
      return db.collection<Omit<Budget, "id"> & { _id?: ObjectId }>("budgets")
    } catch (error) {
      console.error("Failed to get budgets collection:", error)
      throw error
    }
  }

  static async findAll(): Promise<Budget[]> {
    try {
      const collection = await this.getCollection()
      const budgets = await collection.find({}).sort({ month: -1 }).toArray()

      return budgets.map(({ _id, ...budget }) => ({
        id: _id!.toString(),
        ...budget,
      }))
    } catch (error) {
      console.error("Error finding budgets:", error)
      throw error
    }
  }

  static async create(budget: Omit<Budget, "id">): Promise<Budget> {
    try {
      const collection = await this.getCollection()
      const result = await collection.insertOne(budget)

      return {
        id: result.insertedId.toString(),
        ...budget,
      }
    } catch (error) {
      console.error("Error creating budget:", error)
      throw error
    }
  }

  static async findById(id: string): Promise<Budget | null> {
    try {
      if (!ObjectId.isValid(id)) {
        return null
      }

      const collection = await this.getCollection()
      const budget = await collection.findOne({ _id: new ObjectId(id) })

      if (!budget) return null

      const { _id, ...budgetData } = budget
      return {
        id: _id.toString(),
        ...budgetData,
      }
    } catch (error) {
      console.error("Error finding budget by ID:", error)
      throw error
    }
  }

  static async updateById(id: string, updates: Partial<Omit<Budget, "id">>): Promise<Budget | null> {
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

      const { _id, ...budgetData } = result
      return {
        id: _id.toString(),
        ...budgetData,
      }
    } catch (error) {
      console.error("Error updating budget:", error)
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
      console.error("Error deleting budget:", error)
      throw error
    }
  }

  static async findByCategory(category: string): Promise<Budget[]> {
    try {
      const collection = await this.getCollection()
      const budgets = await collection.find({ category }).sort({ month: -1 }).toArray()

      return budgets.map(({ _id, ...budget }) => ({
        id: _id!.toString(),
        ...budget,
      }))
    } catch (error) {
      console.error("Error finding budgets by category:", error)
      throw error
    }
  }
}

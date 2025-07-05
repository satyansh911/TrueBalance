import { getDatabase } from "@/lib/mongodb"
import type { Budget } from "@/types"
import { ObjectId } from "mongodb"

export class BudgetModel {
    private static async getCollection() {
        const db = await getDatabase()
        return db.collection<Omit<Budget, "id"> & { _id?: ObjectId }>("budgets")
    }
    static async findAll(): Promise<Budget[]> {
        const collection = await this.getCollection()
        const budgets = await collection.find({}).sort({ month: -1 }).toArray()
        return budgets.map(({ _id, ...budget }) => ({
            id: _id!.toString(),
            ...budget,
        }))
    }
    static async create(budget: Omit<Budget, "id">): Promise<Budget> {
        const collection = await this.getCollection()
        const result = await collection.insertOne(budget)
        return {
            id: result.insertedId.toString(),
            ...budget,
        }
    }
    static async findById(id: string): Promise<Budget | null> {
        const collection = await this.getCollection()
        const budget = await collection.findOne({ _id: new ObjectId(id) })
        if (!budget) return null
        const { _id, ...budgetData } = budget
        return {
            id: _id.toString(),
            ...budgetData,
        }
    }
    static async updateById(id: string, updates: Partial<Omit<Budget, "id">>): Promise<Budget | null> {
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
    }
    static async deleteById(id: string): Promise<boolean> {
        const collection = await this.getCollection()
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        return result.deletedCount > 0
    }
    static async findByCategory(category: string): Promise<Budget[]> {
        const collection = await this.getCollection()
        const budgets = await collection.find({ category }).sort({ month: -1 }).toArray()
        return budgets.map(({ _id, ...budget }) => ({
            id: _id!.toString(),
            ...budget,
        }))
    }
}
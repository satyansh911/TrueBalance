"use client"

import { getDatabase } from "@/lib/mongodb"
import type { Transaction } from "@/types"
import { ObjectId } from "mongodb"

export class TransactionModel {
    private static async getCollection() {
        const db = await getDatabase()
        return db.collection<Omit<Transaction, "id"> & { _id?: ObjectId }>("transactions")
    }
    static async findAll(): Promise<Transaction[]> {
        const collection = await this.getCollection()
        const transactions = await collection.find({}).sort({ date: -1 }).toArray()
        return transactions.map(({ _id, ...transaction }) => ({
            id: _id!.toString(),
            ...transaction,
        }))
    }
    static async create(transaction: Omit<Transaction, "id">): Promise<Transaction> {
        const collection = await this.getCollection()
        const result = await collection.insertOne(transaction)
        return {
            id: result.insertedId.toString(),
            ...transaction,
        }
    }
    static async findById(id: string): Promise<Transaction | null> {
        const collection = await this.getCollection()
        const transaction = await collection.findOne({ _id: new ObjectId(id) })
        if (!transaction) return null
        const { _id, ...transactionData } = transaction
        return {
            id: _id.toString(),
            ...transactionData,
        }
    }
    static async updateById(id: string, updates: Partial<Omit<Transaction, "id">>): Promise<Transaction | null> {
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
    }
    static async deleteById(id: string): Promise<boolean> {
        const collection = await this.getCollection()
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        return result.deletedCount > 0
    }
}
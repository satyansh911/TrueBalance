"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Budget, CATEGORIES } from "@/types"

interface BudgetFormProps {
    budget?: Budget | null
    onSubmit: (budget: Budget | Omit<Budget, "id">) => Promise<void>
    onCancel: () => void
}

export function BudgetForm({ budget, onSubmit, onCancel }: BudgetFormProps){
    const [formData, setFormData] = useState({
        category: budget?.category || "",
        amount: budget?.amount?.toString() || "",
        month: budget?.month || new Date().toISOString().slice(0, 7),
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if(!formData.category) {
            newErrors.category = "Please select a category"
        }
        if(!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0){
            newErrors.amount = "Please enter a valid amount greater than 0"
        }
        if(!formData.month){
            newErrors.month = "Please select a month"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!validateForm()){
            return
        }
        const budgetData = {
            ...(budget && { id: budget.id }),
            category: formData.category,
            amount: Number(formData.amount),
            month: formData.month,
        }
        onSubmit(budgetData as Budget)
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amount">Budget Amount ($)</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className={errors.amount ? "border-red-500" : ""}
                    />
                    {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input
                    id="month"
                    type="month"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className={errors.month ? "border-red-500" : ""}
                />
                {errors.month && <p className="text-sm text-red-500">{errors.month}</p>}
            </div>
            <div className="flex gap-2 pt-4">
                <Button type="submit">{budget ? "Update Budget" : "Add Budget"}</Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}
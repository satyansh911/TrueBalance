export interface Transaction {
    id: string
    amount: number
    date: string
    description: string
    category: string
}
export interface Budget {
    id: string
    category: string
    amount: number
    month: string
}
export const CATEGORIES = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Education",
    "Personal Care",
    "Other",
] as const
export type Category = (typeof CATEGORIES)[number]
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EditIcon from "./ui/editIcon"
import DeleteIcon from "./ui/deleteIcon"
import { LottieSafeWrapper } from "./lottie-safe-wrapper"
interface TransactionListProps {
    transactions: Transaction[]
    onEdit: (transaction: Transaction) => void
    onDelete: (id: string) => void
}
export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found.</p>
                <p className="text-sm text-muted-foreground mt-1">Add your first transaction to get started.</p>
            </div>
        )
    }
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{transaction.category}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => onEdit(transaction)}>
                                        <LottieSafeWrapper 
                                            src="/edit.json"
                                            size={24}
                                            autoplay={true}
                                            loop={true}
                                            fallbackIcon="🔍"
                                        />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => onDelete(transaction.id)}>
                                        <LottieSafeWrapper 
                                            src="/delete.json"
                                            size={24}
                                            autoplay={true}
                                            loop={true}
                                            fallbackIcon="🔍"
                                        />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { User, Transaction } from "@/lib/types";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { AddTransactionForm } from "./add-transaction-form";


const mockTransactions: Transaction[] = [
    {
      id: "txn_001",
      type: "Bonus",
      asset: "USDT",
      amount: 200,
      status: "Completed",
      date: "2024-07-29",
    },
    {
      id: "txn_002",
      type: "Deposit",
      asset: "BTC",
      amount: 0.005,
      status: "Completed",
      date: "2024-07-27",
    },
     {
      id: "txn_003",
      type: "Withdrawal",
      asset: "ETH",
      amount: 0.1,
      status: "Pending",
      date: "2024-07-28",
    },
  ];

interface EditUserDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

export function EditUserDialog({ user, isOpen, onClose, onUpdate }: EditUserDialogProps) {
  const { toast } = useToast();
  const [balance, setBalance] = useState(user.balance);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const handleBalanceSave = () => {
    console.log(`Updating balance for ${user.email} to ${balance}`);
    onUpdate({ ...user, balance: Number(balance) });
    toast({
      title: "Balance Updated",
      description: `${user.name}'s balance has been updated.`,
    });
  };

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
        ...newTransaction,
        id: `txn_${Math.random().toString(36).substring(2, 9)}`,
        date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [transaction, ...prev]);
    toast({
        title: "Transaction Added",
        description: `New ${transaction.type} transaction for ${transaction.amount} ${transaction.asset} has been added.`,
    });
  }

  const handleRemoveTransaction = (transactionId: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== transactionId));
    toast({
        title: "Transaction Removed",
        description: `Transaction has been removed from the history.`,
        variant: "destructive"
    });
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
          <DialogDescription>
            Modify user details for {user.email}. Changes are applied immediately.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Balance Management */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Portfolio Balance</h4>
            <div className="flex items-center gap-4">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="balance">Balance (USD)</Label>
                <Input
                  id="balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                  className="bg-white"
                />
              </div>
              <Button onClick={handleBalanceSave} className="self-end">Save Balance</Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Transaction History */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Transaction History</h4>
            <div className="rounded-md border max-h-60 overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Asset</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map(tx => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.type}</TableCell>
                                <TableCell>{tx.asset}</TableCell>
                                <TableCell>{tx.amount}</TableCell>
                                <TableCell>{tx.status}</TableCell>
                                <TableCell>{tx.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveTransaction(tx.id)}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </div>

          <Separator />
          
          {/* Add Transaction */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Add New Transaction</h4>
            <AddTransactionForm onSubmit={handleAddTransaction} />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

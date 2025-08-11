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
import { Copy, Trash2 } from "lucide-react";
import { AddTransactionForm } from "./add-transaction-form";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


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
  const [walletAddress, setWalletAddress] = useState(user.walletAddress ?? `0x${Math.random().toString(16).substr(2, 40)}`);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const handleSave = () => {
    onUpdate({ ...user, balance: Number(balance), walletAddress });
    toast({
      title: "User Updated",
      description: `${user.name}'s details have been updated.`,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Copied to clipboard!",
      description: "Wallet address has been copied.",
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
      <DialogContent className="sm:max-w-3xl bg-slate-50">
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
          <DialogDescription>
            Modify user details for {user.email}. Changes are applied immediately.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          
          {/* User Details Management */}
          <div className="space-y-4 p-4 rounded-lg bg-white border border-slate-200">
            <h4 className="font-medium text-slate-800">User Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="balance">Balance (USD)</Label>
                    <Input
                        id="balance"
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                        className="bg-slate-100"
                    />
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <div className="relative">
                        <Input
                            id="walletAddress"
                            type="text"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="bg-slate-100 font-mono text-xs pr-10"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                            onClick={handleCopy}
                            >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
             <div className="flex justify-end">
                <Button onClick={handleSave}>Save User Details</Button>
            </div>
          </div>


          {/* Wallet QR Code */}
          <div className="space-y-4 p-4 rounded-lg bg-white border border-slate-200">
             <h4 className="font-medium text-slate-800">Wallet QR Code</h4>
             <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="p-2 rounded-lg border bg-white shadow-sm">
                    <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`}
                        alt="User Wallet QR Code"
                        width={150}
                        height={150}
                        className="rounded-md"
                    />
                </div>
                <div className="flex-1">
                    <Alert>
                        <AlertTitle>Notice</AlertTitle>
                        <AlertDescription>
                            This QR code is generated dynamically from the user's wallet address. Updating the address will automatically update the QR code.
                        </AlertDescription>
                    </Alert>
                </div>
             </div>
          </div>
          
          <Separator />
          
          {/* Transaction History */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Transaction History</h4>
            <div className="rounded-md border max-h-60 overflow-y-auto bg-white">
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

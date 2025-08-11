
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/lib/types";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const transactionsData: Transaction[] = [
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

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this data.
    // For now, we'll use the mock data.
    setTransactions(transactionsData);
  }, []);

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "Processing":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>A log of your recent account activity.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Responsive view for mobile */}
        <div className="md:hidden">
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{tx.type} - {tx.asset}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(tx.status)}>{tx.status}</Badge>
                </div>
                <div className="mt-2 text-right">
                  <p className="font-mono text-lg">{tx.amount.toFixed(tx.asset === 'USDT' ? 2 : 6)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table view for larger screens */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.type}</TableCell>
                  <TableCell>{tx.asset}</TableCell>
                  <TableCell className="text-right">{tx.amount.toFixed(tx.asset === 'USDT' ? 2 : 6)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={getStatusColor(tx.status)}>{tx.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatDate(tx.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 text-center">
            <Button variant="outline">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  );
}

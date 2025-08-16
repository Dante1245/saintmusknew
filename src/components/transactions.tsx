
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
import type { Transaction, User } from "@/lib/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'

export function Transactions() {
  const router = useRouter();
  const pathname = usePathname();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        const userData: User = JSON.parse(storedUser);
        setTransactions(userData.transactions ?? []);
      }
    } catch (e) {
      setError("Failed to load transaction data.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
    // Treat the date string as UTC to prevent timezone shifts
    const date = new Date(`${dateString}T00:00:00Z`);
    return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        timeZone: 'UTC'
    }).format(date);
  }

  const formatAmount = (amount: number, asset: string) => {
    const fixedDecimalPlaces = asset === 'USDT' ? 2 : 6;
    const formattedAmount = amount.toFixed(fixedDecimalPlaces);
    if (asset === 'USDT') {
      return `$${formattedAmount}`;
    }
    return formattedAmount;
  };

  const isHistoryPage = pathname === '/history';
  const displayedTransactions = isHistoryPage ? transactions : transactions.slice(0, 5);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
            {isHistoryPage 
                ? "A complete record of all your account activity."
                : "A log of your recent account activity."
            }
        </CardDescription>
      </CardHeader>
      {error && (
        <div className="px-6 pb-4 text-center text-sm text-red-500">
          {error}
        </div>
      )}
      <CardContent>
        {isLoading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
                Loading transactions...
            </div>
        )}
        {!isLoading && transactions.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">
                You have no transactions yet.
            </div>
        )}

        {!isLoading && transactions.length > 0 && (
            <>
                {/* Responsive view for mobile */}
                <div className="md:hidden">
                <div className="space-y-4">
                    {displayedTransactions.map((tx, index) => (
                    <div key={tx.id} className={`border-b pb-4 ${index === displayedTransactions.length - 1 ? 'border-0 pb-0' : ''} space-y-2`}>
                        <div className="flex justify-between items-start">
                        <div>
                            <p className="font-medium">{tx.type} - {tx.asset}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(tx.status)}>{tx.status}</Badge>
                        </div>
                        <div className="mt-2 text-right">
                          <p className="font-mono text-lg">{formatAmount(tx.amount, tx.asset)}</p>
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
                        <TableHead className="w-[100px]">Asset</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right w-[120px]">Date</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {displayedTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.type}</TableCell>
                        <TableCell>{tx.asset}</TableCell>
                        <TableCell className="text-right font-mono">{formatAmount(tx.amount, tx.asset)}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant="outline" className={getStatusColor(tx.status)}>{tx.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatDate(tx.date)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>

                {!isHistoryPage && transactions.length > 5 && (
                <div className="mt-6 text-center">
                    <Button variant="outline" onClick={() => router.push('/history')}>View All Transactions</Button>
                </div>
                )}
            </>
        )}
       </CardContent>
    </Card>
  );
}

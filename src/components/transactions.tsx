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

const transactions: Transaction[] = [
  {
    id: "txn_001",
    type: "Bonus",
    asset: "USDT",
    amount: 200,
    status: "Completed",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "txn_002",
    type: "Deposit",
    asset: "BTC",
    amount: 0.005,
    status: "Completed",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
   {
    id: "txn_003",
    type: "Withdrawal",
    asset: "ETH",
    amount: 0.1,
    status: "Pending",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
];

export function Transactions() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>A log of your recent account activity.</CardDescription>
      </CardHeader>
      <CardContent>
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
                <TableCell className="text-right">{tx.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

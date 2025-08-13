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
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useState } from "react";

  const mockWithdrawals = [
    { id: "wd_001", userId: "usr_003", asset: "ETH", amount: 0.1, address: "0x123...abc", status: "Pending", requestDate: "2024-07-28" },
    { id: "wd_002", userId: "usr_002", asset: "BTC", amount: 0.05, address: "bc1q...xyz", status: "Pending", requestDate: "2024-07-29" },
  ];
  
  export function WithdrawalRequests() {
  const [withdrawalRequests, setWithdrawalRequests] = useState(mockWithdrawals);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

    return (
  const updateRequestStatus = (id: string, status: "Approved" | "Declined") => {
    setError(null);
    // Simulate API call
    setTimeout(() => {
      setWithdrawalRequests(currentRequests =>
        currentRequests.map(req =>
          req.id === id ? { ...req, status: status } : req
        )
      );
      setProcessingId(null);
      // Simulate potential error - Uncomment to test error state
      // if (Math.random() > 0.8) {
      //   setError(`Failed to update request ${id}`);
      // }
    }, 1000);
    // Set processing state immediately
    setProcessingId(id);
  };

  const handleApprove = (id: string) => updateRequestStatus(id, "Approved");
  const handleDecline = (id: string) => updateRequestStatus(id, "Declined");

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>Review and process pending withdrawal requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Responsive List for Mobile */}
          <div className="md:hidden space-y-4">
             {error && <div className="text-red-500 mb-4">{error}</div>}
              {withdrawalRequests.map((req) => (
                <div key={req.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-xs text-muted-foreground">{req.id}</span>
                         <Badge variant="outline" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">{req.status}</Badge>
                    </div>
                    <p className="font-semibold">{req.amount} {req.asset}</p>
                    <p className="text-sm text-muted-foreground font-mono truncate">{req.address}</p>
                    <p className="text-xs text-muted-foreground">User: {req.userId}</p>
                    <p className="text-xs text-muted-foreground">Date: {req.requestDate}</p>
                     <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-400/10 text-green-400 border-green-400/30 hover:bg-green-400/20"
                          onClick={() => handleApprove(req.id)}
                          disabled={req.status !== 'Pending' || processingId === req.id}
                        >
                            <Check className="h-4 w-4 mr-2" />
                            {processingId === req.id ? 'Processing...' : 'Approve'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-400/10 text-red-400 border-red-400/30 hover:bg-red-400/20"
                          onClick={() => handleDecline(req.id)}
                          disabled={req.status !== 'Pending' || processingId === req.id}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Decline
                        </Button>
                    </div>
                </div>
              ))}
          </div>

          {/* Table for Desktop */}
          <div className="hidden md:block">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {withdrawalRequests.map((req) => (
                    <TableRow key={req.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{req.id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{req.userId}</TableCell>
                    <TableCell>{req.asset}</TableCell>
                    <TableCell className="text-right">{req.amount}</TableCell>
                    <TableCell className="font-mono text-xs">{req.address}</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">{req.status}</Badge>
                        </TableCell>
                    <TableCell>{req.requestDate}</TableCell>
                    <TableCell className="text-right">
 <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-400/10 text-green-400 border-green-400/30 hover:bg-green-400/20"
                              onClick={() => handleApprove(req.id)}
                              disabled={req.status !== 'Pending' || processingId === req.id}
                            >
                              {processingId === req.id ? 'Processing...' : 'Approve'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-400/10 text-red-400 border-red-400/30 hover:bg-red-400/20"
                              onClick={() => handleDecline(req.id)}
                              disabled={req.status !== 'Pending' || processingId === req.id}
                            >
                              Decline
                            </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
  

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
  
  const mockWithdrawals = [
    { id: "wd_001", userId: "usr_003", asset: "ETH", amount: 0.1, address: "0x123...abc", status: "Pending", requestDate: "2024-07-28" },
  ];
  
  export function WithdrawalRequests() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>Review and process pending withdrawal requests.</CardDescription>
        </CardHeader>
        <CardContent>
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
              {mockWithdrawals.map((req) => (
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
                        <Button variant="outline" size="sm" className="bg-green-400/10 text-green-400 border-green-400/30 hover:bg-green-400/20">Approve</Button>
                        <Button variant="outline" size="sm" className="bg-red-400/10 text-red-400 border-red-400/30 hover:bg-red-400/20">Decline</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  
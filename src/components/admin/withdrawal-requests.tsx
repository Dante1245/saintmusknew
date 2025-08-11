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
                  <TableCell className="font-mono text-xs">{req.id}</TableCell>
                  <TableCell className="font-mono text-xs">{req.userId}</TableCell>
                  <TableCell>{req.asset}</TableCell>
                  <TableCell className="text-right">{req.amount}</TableCell>
                  <TableCell className="font-mono text-xs">{req.address}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{req.status}</Badge>
                    </TableCell>
                  <TableCell>{req.requestDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">Approve</Button>
                        <Button variant="outline" size="sm" className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200">Decline</Button>
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
  
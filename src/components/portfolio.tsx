import { DollarSign, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

export function Portfolio() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$200.00</div>
        <p className="text-xs text-muted-foreground">+0.0% from last month</p>
        <div className="mt-4 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">USDT Balance:</span>
          <span>$200.00</span>
          <Badge variant="secondary">Signup Bonus</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

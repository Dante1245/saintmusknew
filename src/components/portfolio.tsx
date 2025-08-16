
"use client";

import { DollarSign, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";

export function Portfolio() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const balance = user?.balance ?? 0;
  const usdtBalance = user?.transactions?.find(tx => tx.asset === 'USDT' && tx.type === 'Bonus')?.amount ?? 0;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">+0.0% from last month</p>
        {usdtBalance > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">USDT Balance:</span>
            <span>${usdtBalance.toFixed(2)}</span>
            <Badge variant="secondary">Signup Bonus</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



"use server";

import { DollarSign, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import type { User } from "@/lib/types";
import { cookies } from 'next/headers';

async function getUser(): Promise<User | null> {
  const userCookie = cookies().get('loggedInUser')?.value;
  if (userCookie) {
    try {
      // In a real app, you would validate this against a secure session, not just parse a cookie.
      return JSON.parse(userCookie);
    } catch (e) {
      console.error("Failed to parse user cookie", e);
      return null;
    }
  }
  return null;
}

export async function Portfolio() {
  const user = await getUser();

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



"use client";

import { useEffect, useState } from "react";
import { DollarSign, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import type { User } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userCookie = localStorage.getItem('loggedInUser');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (e) {
      console.error("Failed to parse user cookie", e);
      return null;
    }
  }
  return null;
}

export function Portfolio() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = () => {
    const userData = getUser();
    setUser(userData);
    setLoading(false);
  };
  
  useEffect(() => {
    loadUserData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'loggedInUser') {
        loadUserData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);

  if (loading) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-3/4 mb-1" />
                <Skeleton className="h-4 w-1/2" />
                <div className="mt-4 flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
            </CardContent>
        </Card>
    );
  }

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

"use client";

import { useState, useEffect } from "react";
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
import type { CryptoData } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  IconBitcoin,
  IconCardano,
  IconDogecoin,
  IconEthereum,
  IconRipple,
  IconSolana,
  IconTether,
} from "./icons";

const COIN_IDS = "bitcoin,ethereum,tether,ripple,cardano,solana,dogecoin";

const cryptoDetails: {
  [key: string]: { name: string; symbol: string; icon: React.ElementType };
} = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", icon: IconBitcoin },
  ethereum: { name: "Ethereum", symbol: "ETH", icon: IconEthereum },
  tether: { name: "Tether", symbol: "USDT", icon: IconTether },
  ripple: { name: "Ripple", symbol: "XRP", icon: IconRipple },
  cardano: { name: "Cardano", symbol: "ADA", icon: IconCardano },
  solana: { name: "Solana", symbol: "SOL", icon: IconSolana },
  dogecoin: { name: "Dogecoin", symbol: "DOGE", icon: IconDogecoin },
};

export function MarketView() {
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: CryptoData = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch crypto data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const renderPriceChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <span className={cn(isPositive ? "text-green-400" : "text-red-400")}>
        {isPositive ? "▲" : "▼"} {change.toFixed(2)}%
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>
          Live prices and 24-hour change for top cryptocurrencies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
              <TableHead className="text-right">Trade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 7 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex flex-col gap-1">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-3 w-10" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-20 ml-auto rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              : data &&
                Object.keys(data).map((coinId) => {
                  const coin = data[coinId];
                  const details = cryptoDetails[coinId];
                  const Icon = details?.icon;
                  return (
                    <TableRow key={coinId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
                          <div>
                            <div className="font-medium">{details?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {details?.symbol}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${coin.usd.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {renderPriceChange(coin.usd_24h_change)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="cursor-pointer bg-primary/10 text-primary-foreground/80 hover:bg-primary/20"
                        >
                          Trade
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";
import { MarketNews } from "@/components/market-news";
import { Separator } from "@/components/ui/separator";

export default function MarketsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would have a more robust auth check.
    // For this prototype, we check localStorage.
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('loggedInUser');
      setIsLoggedIn(!!user);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="flex min-h-screen w-full flex-col bg-background items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {isLoggedIn ? <DashboardHeader /> : <LandingHeader />}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Crypto Market News</h1>
            <p className="text-muted-foreground">
              The latest headlines and analysis from the world of digital assets.
            </p>
          </div>
          <Separator />
          <MarketNews />
        </div>
      </main>
      {!isLoggedIn && <LandingFooter />}
    </div>
  );
}

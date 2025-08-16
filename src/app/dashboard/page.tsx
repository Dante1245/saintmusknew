
"use client";

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { Portfolio } from '@/components/portfolio';
import { MarketView } from '@/components/market-view';
import { WalletCard } from '@/components/wallet-card';
import { Transactions } from '@/components/transactions';
import { NotificationHandler } from '@/components/notification-handler';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle2, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const [showBonusPopup, setShowBonusPopup] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after hydration
    const shouldShowPopup = localStorage.getItem('showBonusPopup');
    if (shouldShowPopup === 'true') {
      setShowBonusPopup(true);
      localStorage.removeItem('showBonusPopup'); // Remove the flag so it doesn't show again
    }
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Portfolio />
            </div>
            <Card className="lg:col-span-1 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Referral Bonus</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full py-4">
                <div className="text-2xl font-bold">$10</div>
                <p className="text-xs text-muted-foreground">Invite friends and earn rewards!</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <MarketView />
            </div>
            <div className="row-start-1 xl:row-start-auto">
              <WalletCard />
            </div>
          </div>
          
          <Transactions onHistoryPage={false} />
        </main>
        <NotificationHandler />
      </div>

      <AlertDialog open={showBonusPopup} onOpenChange={setShowBonusPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-center gap-2 text-center">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              <span className="text-xl">Signup Bonus Awarded!</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="py-4 text-center text-base">
              Congratulations! A welcome bonus of
              <span className="font-bold text-foreground"> $200.00 USDT </span>
              has been added to your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full" onClick={() => setShowBonusPopup(false)}>
              Start Trading
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

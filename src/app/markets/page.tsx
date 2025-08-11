import { DashboardHeader } from "@/components/dashboard-header";
import { MarketNews } from "@/components/market-news";
import { Separator } from "@/components/ui/separator";

export default function MarketsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
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
    </div>
  );
}

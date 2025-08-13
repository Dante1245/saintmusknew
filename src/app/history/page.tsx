import { DashboardHeader } from "@/components/dashboard-header";
import { Transactions } from "@/components/transactions";
import { Separator } from "@/components/ui/separator";

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transaction History</h1>
            <p className="text-muted-foreground">
              A complete record of all your account activity.
            </p>
          </div>
          <Separator />
          <Transactions />
        </div>
      </main>
    </div>
  );
}

import { DashboardHeader } from "@/components/dashboard-header";
import { Transactions } from "@/components/transactions";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function TransactionsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>A complete record of all your account activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center py-2">
                            <div className="ml-4 space-y-2">
                                <Skeleton className="h-4 w-[300px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transaction History</h1>
            <p className="text-muted-foreground">
              A complete record of all your account activity.
            </p>
          </div>
          <Separator />
          <Suspense fallback={<TransactionsSkeleton />}>
            <Card>
                <CardContent className="p-0">
                    <Transactions onHistoryPage={true} />
                </CardContent>
            </Card>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

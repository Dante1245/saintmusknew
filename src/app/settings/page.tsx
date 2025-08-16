import { DashboardHeader } from "@/components/dashboard-header";
import { SettingsForm } from "@/components/settings-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <Separator />
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}

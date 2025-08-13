import { DashboardHeader } from "@/components/dashboard-header";
import { ProfileForm } from "@/components/profile-form";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile information.
            </p>
          </div>
          <Separator />
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}

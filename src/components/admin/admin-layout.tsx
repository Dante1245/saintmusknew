import { IconLogo } from "@/components/icons";
import Link from "next/link";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-200 text-slate-900">
      <header className="bg-slate-900 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 text-xl font-bold">
            <IconLogo className="h-8 w-8" />
            <span>elonXchange Admin</span>
          </Link>
          <nav>
            <Link href="/" className="text-sm hover:underline">
              Back to Main Site
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="container mx-auto">
            {children}
        </div>
      </main>
      <footer className="bg-slate-300 p-4 text-center text-xs text-slate-600">
        <p>© 2024 elonXchange Admin Panel. For authorized users only.</p>
      </footer>
    </div>
  );
}

import { IconLogo } from "@/components/icons";
import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            <IconLogo className="h-10 w-10" />
            <span>elonXchange</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}


import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SupportBot } from '@/components/support-bot';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'TradeSim',
  description: 'The most secure and intuitive platform to buy, sell, and manage your cryptocurrency portfolio.',
  openGraph: {
    title: 'TradeSim',
    description: 'The most secure and intuitive platform to buy, sell, and manage your cryptocurrency portfolio.',
    url: 'https://elontradex.live',
    siteName: 'TradeSim',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="container">{children}</div>
            <Toaster />
            <SupportBot />
        </ThemeProvider>
      </body>
    </html>
  );
}


import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SupportBot } from '@/components/support-bot';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ElonTradeX',
  description: 'The most secure and intuitive platform to buy, sell, and manage your cryptocurrency portfolio.',
  openGraph: {
    title: 'ElonTradeX',
    description: 'The most secure and intuitive platform to buy, sell, and manage your cryptocurrency portfolio.',
    url: 'https://elontradex.live',
    siteName: 'ElonTradeX',
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
      <body className={inter.className}>
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

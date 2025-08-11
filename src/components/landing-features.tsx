import { ShieldCheck, CandlestickChart, Headset, Rocket, Smartphone, Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: 'Secure Multi-Asset Wallet',
    description: 'Safely store, send, and receive a wide range of cryptocurrencies with our state-of-the-art, insured wallet infrastructure.',
  },
  {
    icon: <CandlestickChart className="h-10 w-10 text-primary" />,
    title: 'Advanced Trading Tools',
    description: 'Access real-time market data, advanced charting, and a suite of analytical tools to make informed trading decisions.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Blazing-Fast Transactions',
    description: 'Our high-performance matching engine ensures your trades are executed instantly, so you never miss a market opportunity.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Fortress-Level Security',
    description: 'We employ industry-leading security measures, including cold storage and multi-sig wallets, to protect your assets.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Trade on the Go',
    description: 'Our fully-featured mobile app for iOS and Android lets you trade anytime, anywhere, with the same power as your desktop.',
  },
  {
    icon: <Headset className="h-10 w-10 text-primary" />,
    title: '24/7 Expert Support',
    description: 'Our dedicated team of crypto experts is available around the clock to assist you with any questions or issues.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            The Ultimate Crypto Trading Experience
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            elonXchange provides everything you need to navigate the world of digital assets with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-card/80">
                <div className="mb-4">{feature.icon}</div>
                <CardHeader className="p-0 mb-2">
                    <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription>
                    {feature.description}
                </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
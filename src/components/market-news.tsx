import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const mockNews = [
    {
        title: "Bitcoin Hits New All-Time High Amidst Institutional Interest",
        source: "CryptoNews Daily",
        time: "2h ago",
        image: "https://placehold.co/600x400.png",
        aiHint: "bitcoin chart"
    },
    {
        title: "Ethereum's 'Dencun' Upgrade Goes Live, Promising Lower Fees",
        source: "ETH World",
        time: "4h ago",
        image: "https://placehold.co/600x400.png",
        aiHint: "ethereum network"
    },
    {
        title: "SEC Delays Decision on Spot Solana ETF, Citing Market Concerns",
        source: "The Block",
        time: "6h ago",
        image: "https://placehold.co/600x400.png",
        aiHint: "government building"
    },
    {
        title: "Dogecoin Foundation Announces New Roadmap for 2024",
        source: "Doge Times",
        time: "1d ago",
        image: "https://placehold.co/600x400.png",
        aiHint: "doge coin"
    },
    {
        title: "DeFi Sector Surpasses $100 Billion in Total Value Locked (TVL)",
        source: "DeFi Pulse",
        time: "1d ago",
        image: "https://placehold.co/600x400.png",
        aiHint: "digital currency"
    },
    {
        title: "XRP Ledger Sees Record Growth in New Wallets",
        source: "Ripple Insights",
        time: "2d ago",
        image: "https://placehold.co/600x400.png",
        aiHint: "ripple coin"
    }
];

export function MarketNews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNews.map((news, index) => (
            <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                    <Image 
                        src={news.image} 
                        alt={news.title}
                        fill
                        className="object-cover"
                        data-ai-hint={news.aiHint}
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between pt-2">
                        <span>{news.source}</span>
                        <span>{news.time}</span>
                    </CardDescription>
                </CardHeader>
            </Card>
        ))}
    </div>
  );
}

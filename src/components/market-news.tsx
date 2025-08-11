
"use client";

import Image from "next/image";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { CryptoNewsArticle } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

function timeAgo(timestamp: number): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - (timestamp * 1000)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + "y ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + "mo ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + "d ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + "h ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + "m ago";
    }
    return Math.floor(seconds) + "s ago";
}


export function MarketNews() {
    const [news, setNews] = useState<CryptoNewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setNews(data.Data.slice(0, 12)); // Get first 12 articles
            } catch (err: any) {
                setError(err.message);
                console.error("Failed to fetch news:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (error) {
        return <div className="text-center text-destructive">Failed to load news: {error}</div>;
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                    <Skeleton className="aspect-video w-full" />
                    <CardHeader>
                        <Skeleton className="h-5 w-5/6" />
                        <Skeleton className="h-5 w-4/6" />
                         <CardDescription className="flex items-center justify-between pt-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-4 w-1/4" />
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))
        ) : (
            news.map((article) => (
            <a href={article.url} target="_blank" rel="noopener noreferrer" key={article.id} className="block hover:opacity-80 transition-opacity">
                <Card className="overflow-hidden h-full">
                    <div className="aspect-video relative">
                        <Image 
                            src={article.imageurl} 
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-base leading-tight">{article.title}</CardTitle>
                        <CardDescription className="flex items-center justify-between pt-2 text-xs">
                            <span>{article.source_info.name}</span>
                            <span>{timeAgo(article.published_on)}</span>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </a>
        )))}
    </div>
  );
}

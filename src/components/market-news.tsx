
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

    const fetchNews = async () => {
        try {
            setLoading(true);
            setError(null);
            // No need to set loading to true on refetch, to avoid UI flicker
            const response = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&_=${new Date().getTime()}`);
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

    useEffect(() => {
        fetchNews();

        // Set up an interval to refetch news every 60 seconds
        const intervalId = setInterval(fetchNews, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
              {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="flex flex-col">
                      <Skeleton className="aspect-video w-full" />
                      <CardHeader className="flex flex-col flex-1">
                          <Skeleton className="h-5 w-5/6 mb-3" />
                          <Skeleton className="h-5 w-4/6" />
                           <div className="flex items-center justify-between pt-6 text-xs text-muted-foreground mt-auto">
                             <Skeleton className="h-4 w-1/4" />
                             <Skeleton className="h-4 w-1/4" />
                          </div>
                      </CardHeader>
                  </Card>
              ))}
          </div>
      );
    }


    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-red-500 dark:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-semibold mb-2">Failed to load news</p>
                <p className="text-sm text-muted-foreground">Error: {error}</p>
            </div>
        );

    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
        {news.map((article) => (
        <a href={article.url} target="_blank" rel="noopener noreferrer" key={article.id} className="block hover:opacity-80 transition-opacity">
            <Card className="overflow-hidden h-full flex flex-col">
                <div className="aspect-video relative">
                    <Image 
                        src={article.source_info.img} 
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <CardHeader className="flex-1">
                    <CardTitle className="text-base leading-tight mb-2">{article.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between pt-2 text-xs">
                        <span>{article.source_info.name}</span>
                        <span>{timeAgo(article.published_on)}</span>
                    </CardDescription>
                </CardHeader>
            </Card>
        </a>))
        }
    </div>
  );
}

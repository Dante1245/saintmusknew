"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Headset } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupportBot } from './support-bot';

export function SupportBotButton() {
  const [isClient, setIsClient] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <>
      <Button
        onClick={() => setIsBotOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        size="icon"
        className={cn(
          'rounded-full h-14 w-14 shadow-lg z-[9999] cursor-pointer'
        )}
      >
        <Headset className="h-7 w-7" />
        <span className="sr-only">Support Bot</span>
      </Button>
      <SupportBot open={isBotOpen} onOpenChange={setIsBotOpen} />
    </>
  );
}

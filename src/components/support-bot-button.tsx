"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Headset, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupportBot } from './support-bot';

export function SupportBotButton() {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasDragged = useRef(false);

  useEffect(() => {
    setIsClient(true);
    // Position it at the bottom right initially
    setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  }, []);
  
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!buttonRef.current) return;
    setIsDragging(true);
    wasDragged.current = false;
    const rect = buttonRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    wasDragged.current = true;
    let newX = clientX - dragOffset.current.x;
    let newY = clientY - dragOffset.current.y;
    
    // clamp position to be within viewport
    const buttonWidth = buttonRef.current?.offsetWidth || 56;
    const buttonHeight = buttonRef.current?.offsetHeight || 56;
    newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Delay setting wasDragged to false to allow click event to process
    setTimeout(() => {
      wasDragged.current = false;
    }, 0);
  };
  
  const handleClick = () => {
    if (!wasDragged.current) {
      setIsBotOpen(true);
    }
  };

  // Mouse events
  const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => handleDragStart(e.clientX, e.clientY);
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => isDragging && handleDragMove(e.clientX, e.clientY);
  const onMouseUp = () => isDragging && handleDragEnd();
  const onMouseLeave = () => isDragging && handleDragEnd();
  
  // Touch events
  const onTouchStart = (e: TouchEvent<HTMLButtonElement>) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => isDragging && handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => isDragging && handleDragEnd();
  
  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <>
       <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: isDragging ? 'auto' : 'none',
          zIndex: 9998,
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      <Button
        ref={buttonRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={handleClick}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          touchAction: 'none',
        }}
        size="icon"
        className={cn(
          'rounded-full h-14 w-14 shadow-lg z-[9999] cursor-pointer transition-transform',
          isDragging && 'cursor-grabbing scale-110'
        )}
      >
        <Headset className="h-7 w-7" />
        <span className="sr-only">Support Bot</span>
      </Button>
      <SupportBot open={isBotOpen} onOpenChange={setIsBotOpen} />
    </>
  );
}

"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Headset } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SupportBotButton() {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsClient(true);
    setPosition({ x: 20, y: window.innerHeight - 100 });
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!buttonRef.current) return;
    setIsDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPosition({
      x: clientX - dragOffset.current.x,
      y: clientY - dragOffset.current.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => handleDragStart(e.clientX, e.clientY);
  const onMouseMove = (e: MouseEvent<HTMLButtonElement>) => handleDragMove(e.clientX, e.clientY);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => handleDragEnd();

  // Touch events
  const onTouchStart = (e: TouchEvent<HTMLButtonElement>) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: TouchEvent<HTMLButtonElement>) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleDragEnd();

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <Button
      ref={buttonRef}
      onMouseDown={onMouseDown}
      onMouseMove={isDragging ? onMouseMove : undefined}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={isDragging ? onTouchMove : undefined}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
      }}
      size="icon"
      className={cn(
        'rounded-full h-14 w-14 shadow-lg z-50 cursor-grab',
        isDragging && 'cursor-grabbing shadow-2xl scale-110'
      )}
    >
      <Headset className="h-7 w-7" />
      <span className="sr-only">Support Bot</span>
    </Button>
  );
}

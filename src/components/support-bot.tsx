'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { supportChat } from '@/ai/flows/support-chat-flow';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { IconLogo } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: string;
};

type SupportBotProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SupportBot({ open, onOpenChange }: SupportBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await supportChat({
        history: messages,
        newMessage: input,
      });
      const botMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Support bot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "Apologies, I'm experiencing some turbulence. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

   useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          content: "Greetings! I'm ElonBot, your guide to elonXchange. How can I help you launch your trading journey today?",
        },
      ]);
    }
  }, [open, messages.length]);


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span>Support Bot</span>
          </SheetTitle>
          <SheetDescription>
            Ask me anything about elonXchange.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-4 -mr-6" ref={scrollAreaRef}>
           <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                   <Avatar className="h-8 w-8">
                     <div className="bg-primary/20 p-1 rounded-full">
                       <IconLogo className="h-6 w-6 text-primary" />
                     </div>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'rounded-br-none bg-primary text-primary-foreground'
                      : 'rounded-bl-none bg-muted'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                   <div className="bg-primary/20 p-1 rounded-full">
                     <IconLogo className="h-6 w-6 text-primary" />
                   </div>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
           <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

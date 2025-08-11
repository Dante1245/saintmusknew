"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function BroadcastMessages() {
    const { toast } = useToast();
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) {
            toast({
                title: "Error",
                description: "Message cannot be empty.",
                variant: "destructive",
            });
            return;
        }
        console.log("Sending broadcast:", message);
        toast({
            title: "Broadcast Sent",
            description: "Your message has been sent to all users.",
        });
        setMessage("");
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Broadcast Message</CardTitle>
        <CardDescription>
          Send an announcement or message to all users.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="broadcast-message">Message</Label>
          <Textarea
            id="broadcast-message"
            placeholder="Type your announcement here..."
            className="bg-white min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button onClick={handleSend}>Send Broadcast</Button>
      </CardContent>
    </Card>
  );
}


"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function SiteSettings() {
    const { toast } = useToast();
    const [depositAddress, setDepositAddress] = useState("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");

    const handleSave = () => {
        console.log("Saving new deposit address:", depositAddress);
        toast({
            title: "Settings Saved",
            description: "The main wallet deposit address has been updated.",
        });
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site-wide Settings</CardTitle>
        <CardDescription>
          Manage global settings for the brokerage site.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="deposit-address">Main Wallet Deposit Address (BTC)</Label>
            <Input 
                id="deposit-address"
                value={depositAddress}
                onChange={(e) => setDepositAddress(e.target.value)}
                className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
                This is the primary address displayed for all user deposits. Changing this will affect the entire site.
            </p>
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardContent>
    </Card>
  );
}

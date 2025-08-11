
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { User, Transaction } from "@/lib/types";
import { Copy } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


interface EditUserDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

export function EditUserDialog({ user, isOpen, onClose, onUpdate }: EditUserDialogProps) {
  const { toast } = useToast();
  const [balance, setBalance] = useState(user.balance);
  const [walletAddress, setWalletAddress] = useState(user.walletAddress ?? `0x${Math.random().toString(16).substr(2, 40)}`);

  const handleSave = () => {
    onUpdate({ ...user, balance: Number(balance), walletAddress });
    toast({
      title: "User Updated",
      description: `${user.name}'s details have been updated.`,
    });
  };

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Copied to clipboard!",
        description: "Wallet address has been copied.",
      });
    }
  };


  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-slate-50">
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
          <DialogDescription>
            Modify user details for {user.email}. Changes are applied immediately.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          
          {/* User Details Management */}
          <div className="space-y-4 p-4 rounded-lg bg-white border border-slate-200">
            <h4 className="font-medium text-slate-800">User Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="balance">Balance (USD)</Label>
                    <Input
                        id="balance"
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <div className="relative">
                        <Input
                            id="walletAddress"
                            type="text"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="font-mono text-xs pr-10"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                            onClick={handleCopy}
                            >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
             <div className="flex justify-end">
                <Button onClick={handleSave}>Save User Details</Button>
            </div>
          </div>


          {/* Wallet QR Code */}
          <div className="space-y-4 p-4 rounded-lg bg-white border border-slate-200">
             <h4 className="font-medium text-slate-800">Wallet QR Code</h4>
             <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="p-2 rounded-lg border bg-white shadow-sm">
                    {walletAddress && (
                        <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`}
                            alt="User Wallet QR Code"
                            width={150}
                            height={150}
                            className="rounded-md"
                        />
                    )}
                </div>
                <div className="flex-1">
                    <Alert>
                        <AlertTitle>Notice</AlertTitle>
                        <AlertDescription>
                            This QR code is generated dynamically from the user's wallet address. Updating the address will automatically update the QR code.
                        </AlertDescription>
                    </Alert>
                </div>
             </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


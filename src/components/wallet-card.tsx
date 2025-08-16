
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Copy, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitWithdrawal } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Image from "next/image";
import { IconBitcoin, IconEthereum, IconTether, IconRipple, IconCardano, IconSolana, IconDogecoin } from "./icons";

const withdrawalSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Please enter a valid amount." })
    .positive({ message: "Amount must be positive." }),
  asset: z.string().min(1, { message: "Please select an asset." }),
  address: z
    .string()
    .min(26, { message: "Wallet address seems too short." })
    .max(62, { message: "Wallet address seems too long." }),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

const depositWallets = {
  BTC: {
    name: "Bitcoin",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    warning: "Only send BTC to this address.",
    icon: IconBitcoin,
  },
  ETH: {
    name: "Ethereum",
    address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    warning: "Only send ETH (ERC-20) to this address.",
    icon: IconEthereum,
  },
  USDT: {
    name: "Tether",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    warning: "Only send USDT (ERC-20) to this address.",
    icon: IconTether,
  },
  XRP: {
    name: "Ripple",
    address: "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh",
    warning: "Only send XRP to this address. Destination Tag may be required.",
    icon: IconRipple,
  },
  ADA: {
    name: "Cardano",
    address: "addr1q8s4s9xrmucrkqczf99ft6zgh2g2vcf5phpsg0jdc4r8gln5z7f0g2f7k5h2j...",
    warning: "Only send ADA to this address.",
    icon: IconCardano,
  },
  SOL: {
    name: "Solana",
    address: "So11111111111111111111111111111111111111112",
    warning: "Only send SOL to this address.",
    icon: IconSolana,
  },
  DOGE: {
    name: "Dogecoin",
    address: "D7bA4w4zL1N7k1M3fQ5cZ6eP9aB8iGfT3k",
    warning: "Only send DOGE to this address.",
    icon: IconDogecoin,
  },
};

type DepositAsset = keyof typeof depositWallets;


export function WalletCard() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [selectedDepositAsset, setSelectedDepositAsset] = useState<DepositAsset>("BTC");

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: undefined,
      asset: "BTC",
      address: "",
    },
  });

  const activeWallet = depositWallets[selectedDepositAsset];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeWallet.address);
    toast({
      title: "Copied to clipboard!",
      description: "Wallet address has been copied.",
    });
  };

  const onSubmit = (values: WithdrawalFormValues) => {
    startTransition(async () => {
      const result = await submitWithdrawal(values);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };
  
  const renderSelectItem = (asset: DepositAsset) => {
    const { name, icon: Icon } = depositWallets[asset];
    return (
        <SelectItem value={asset} key={asset}>
            <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <span>{name} ({asset})</span>
            </div>
        </SelectItem>
    );
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
        <CardDescription>Deposit or withdraw your assets.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="mt-4 space-y-4">
             <div className="space-y-2">
                <Label htmlFor="deposit-asset">Select Asset to Deposit</Label>
                 <Select
                    onValueChange={(value) => setSelectedDepositAsset(value as DepositAsset)}
                    defaultValue={selectedDepositAsset}
                  >
                    <SelectTrigger id="deposit-asset">
                        <SelectValue placeholder="Select an asset" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(depositWallets).map(asset => renderSelectItem(asset as DepositAsset))}
                    </SelectContent>
                </Select>
             </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-sm text-muted-foreground">
                Scan the QR code or copy the address below to deposit {activeWallet.name} ({selectedDepositAsset}).
              </p>
              <div className="p-2 rounded-lg border bg-card shadow-sm">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${activeWallet.address}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  key={selectedDepositAsset} // Force re-render on asset change
                  className="rounded-md"
                />
              </div>
              <div className="relative w-full">
                <Input
                  type="text"
                  value={activeWallet.address}
                  readOnly
                  className="pr-10 text-center sm:text-left font-mono text-xs"
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
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  {activeWallet.warning} Sending any other asset may result in permanent loss.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          <TabsContent value="withdraw" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" type="number" step="any" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="asset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an asset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(depositWallets).map(asset => renderSelectItem(asset as DepositAsset))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter wallet address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Submitting..." : "Request Withdrawal"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

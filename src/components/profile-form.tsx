
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  phoneNumber: z.string().optional(),
  age: z.coerce.number().positive("Age must be a positive number.").optional().or(z.literal('')),
  country: z.string().optional(),
});

export function ProfileForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("/placeholder-avatar.png"); // Using a local placeholder
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Elon Musk",
      email: "elon@tesla.com",
      phoneNumber: "+1-202-555-0104",
      age: 53,
      country: "USA"
    },
  });

  // Simulate fetching initial profile data
  useState(() => {
    setTimeout(() => {
      // Simulate a random error
      const shouldError = Math.random() < 0.2; // 20% chance of error
      if (shouldError) {
        setInitialError("Failed to load profile.");
      } else {
        form.reset(form.defaultValues); // Reset with default values as simulated fetched data
        setInitialError(null);
      }
      setIsInitialLoading(false);
    }, 1500); // 1500ms delay
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    setIsPending(true);
    console.log("Updating profile:", values);
    setSaveError(null); // Clear previous save errors
    setTimeout(() => {
      const shouldError = Math.random() < 0.3; // 30% chance of simulated error
      if (shouldError) {
        setSaveError("Failed to save profile. Please try again.");
        toast({
          title: "Error",
          description: "Failed to save profile.",
          variant: "destructive",
        });
      } else {
        setSaveError(null);
        toast({
          title: "Profile Updated",
          description: "Your profile information has been saved.",
        });
      }
      setIsPending(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        <CardDescription>
        This information will be displayed publicly so be careful what you share.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
         {!isInitialLoading && saveError && (
          <CardContent>
            <div className="text-center text-red-500 dark:text-red-400">
              {saveError}
            </div>
          </CardContent>
        )}
        {isInitialLoading && (
          <CardContent>
            <p className="text-center text-muted-foreground">Loading profile...</p>
          </CardContent>
        )}
        {!isInitialLoading && initialError && (
          <CardContent>
            <div className="text-center text-red-500">
              {initialError}
            </div>
          </CardContent>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 flex-shrink-0">
                  <AvatarImage src={avatarPreview} alt={form.watch('name')} data-ai-hint="man face" />
                  <AvatarFallback>{form.watch('name')?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
 ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                  accept="image/*"
                />
                <Button variant="outline" type="button" onClick={handleAvatarButtonClick}>Change Avatar</Button>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
 <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Your age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
 <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Your country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

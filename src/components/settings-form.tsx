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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});


export function SettingsForm() {
  const { toast } = useToast();
  const [isProfilePending, setIsProfilePending] = useState(false);
  const [isPasswordPending, setIsPasswordPending] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Elon Musk",
      email: "elon@tesla.com",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    setIsProfilePending(true);
    console.log("Updating profile:", values);
    setTimeout(() => {
       toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
      setIsProfilePending(false);
    }, 1000);
  };
  
  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    setIsPasswordPending(true);
    console.log("Updating password");
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your new password has been saved.",
      });
      passwordForm.reset();
      setIsPasswordPending(false);
    }, 1000);
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    document.documentElement.classList.toggle('light', !checked);
     toast({
        title: "Theme Updated",
        description: `Switched to ${checked ? 'dark' : 'light'} mode.`,
      });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This information will be displayed publicly so be careful what you share.
          </CardDescription>
        </CardHeader>
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Elon Musk" data-ai-hint="man face" />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">Change Avatar</Button>
                </div>
              <FormField
                control={profileForm.control}
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
                control={profileForm.control}
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
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={isProfilePending}>
                {isProfilePending ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password here. Please choose a strong password.
          </CardDescription>
        </CardHeader>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <CardContent className="space-y-4">
               <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={isPasswordPending}>
                 {isPasswordPending ? "Saving..." : "Update Password"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
                <div>
                    <FormLabel>Theme</FormLabel>
                    <FormDescription>
                        Select between light and dark mode.
                    </FormDescription>
                </div>
                <div className="flex items-center gap-2">
                    <FormLabel htmlFor="theme-switch" className="text-sm">Light</FormLabel>
                    <Switch
                        id="theme-switch"
                        checked={isDarkMode}
                        onCheckedChange={handleThemeToggle}
                    />
                    <FormLabel htmlFor="theme-switch" className="text-sm">Dark</FormLabel>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

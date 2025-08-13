
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { AuthLayout } from "./auth-layout";
import { Eye, EyeOff } from "lucide-react";
import { IconGoogle } from "./icons";

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

// Zod schema for signup form validation
const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});


export function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter();
  const isLogin = type === "login";
  // Determine which schema to use based on the form type
  const schema = isLogin ? loginSchema : signupSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { confirmPassword: "" }),
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (Math.random() > 0.5) { // Simulate a 50% chance of error
        setError(isLogin ? "Invalid credentials." : "Signup failed. Please try again.");
      } else {
        router.push("/dashboard");
      }
    }, 1500);
  };
  
  const onGoogleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
    setGoogleError("Google sign-in failed. Please try again."); // Simulate Google sign-in error
  };
  
  return (
    <AuthLayout>
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Sign in to access your dashboard."
              : "Enter your details to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4"> {/* Use grid for potentially better spacing on smaller screens */}
          {/* Display general form error */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input // Ensure appropriate padding and width on smaller screens
                        placeholder="elon@tesla.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative"> {/* Ensure the relative container scales correctly */}
                        <Input
                           type={showPassword ? "text" : "password"}
                           placeholder="••••••••"
                          {...field}
                        />
                         <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input // Ensure appropriate padding and width
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} {/* Close conditional rendering for confirm password */}
              <Button type="submit" className="w-full" disabled={isLoading}> {/* Full width button for better mobile UX */}
                {isLoading ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Sign Up")}
              </Button>
            </form>
          </Form>

           {/* Display Google sign-in error */}
          {googleError && (
            <Alert variant="destructive" className="mt-4"> {/* Add margin top for spacing */}
              <AlertDescription>{googleError}</AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm text-muted-foreground">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}

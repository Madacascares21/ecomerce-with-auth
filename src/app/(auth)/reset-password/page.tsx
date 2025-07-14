"use client";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { toast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/authClient";
import { LockIcon, X } from "lucide-react";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const error = searchParams.get("error");
  if (error) {
    return (
      <div className="flex gap-2 items-center justify-center  h-[50vh] text-xl">
        <X className="text-destructive" />
        <span>Link is expired or invalid token</span>{" "}
      </div>
    );
  }

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Here you would typically call your API to reset the password
      // For example: await resetPassword(values.password)
      const { error } = await authClient.resetPassword({
        newPassword: values.confirmPassword,
        token,
      });
      if (error) {
        return toast.error(error.message);
      } else {
        toast.success("Your password has been reset successfully.");
        router.push("/sign-in");
      }
    } catch (error) {
      toast.error("Your password could not be reset. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      <Card className="w-full ">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <LockIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => router.push("/login")}>
            Back to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

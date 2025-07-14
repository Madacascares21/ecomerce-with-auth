"use client";
import { signInFormSchema } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { signIn } from "@/server/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SocialProviders from "../../_components/social-providers";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  console.log(verified);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = searchParams.get("verified");
      if (value === "success") {
        toast.success("Email verified successfully!");
      } else if (value === "error") {
        toast.error("Verification failed. Try again.");
      }
    }, 50); // Slight delay

    return () => clearTimeout(timeout);
  }, []);
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { message, success, statusCode } = await signIn(values);

    if (!success && statusCode === 403) {
      toast.error(message + " " + "An verification email was send!");
      return;
    } else if (!success) {
      toast.error(message);
      return;
    }
    success && toast.success(message);
    redirect("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Sign-in</h1>
            <p className="text-muted-foreground text-balance">
              Connect to your Acme Inc account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
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
                <FormLabel>
                  <div className="flex items-center justify-between w-full">
                    <span>Password</span>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting ? true : false}
          >
            {form.formState.isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <SocialProviders />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;

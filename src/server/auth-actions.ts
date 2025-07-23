"use server";
import { signInFormSchema, signUpFormSchema } from "@/app/schemas";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
export const signIn = async (values: z.infer<typeof signInFormSchema>) => {
  const { success, data, error } = signInFormSchema.safeParse(values);
  if (!success || error) return { success: false, message: "Acces Denided" };
  try {
    const response = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return {
      success: true,
      message: `Wellcome ${response.user.name} 😊✅`,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.body?.message || "",
        statusCode: error.statusCode,
      };
    }
    return {
      success: false,
      message: "There was an error ,please try again!",
    };
  }
};

export const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
  const { success, data, error } = signUpFormSchema.safeParse(values);
  if (!success || error) return { success: false, message: "Acces Denided" };

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: data.username,
        email: data.email,
        password: data.password,
      },
    });
    return {
      success: true,
      message:
        "Sign-up successful! We've sent a verification link to verify your account.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error?.body?.message || "" };
    }
    return { success: false, message: "There was an error ,please try again!" };
  }
};

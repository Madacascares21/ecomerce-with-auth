import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    // .min(8, { message: "Password must be at least 8 characters long" })
    // .max(64, { message: "Password must be at most 64 characters long" })
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter",
    // })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter",
    // })
    // .regex(/[0-9]/, { message: "Password must contain at least one number" })
    // .regex(/[^A-Za-z0-9]/, {
    //   message: "Password must contain at least one special character",
    // }),
});
const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 30 characters long")
  .regex(
    /^[a-zA-Z][a-zA-Z0-9_]*$/,
    "Username must start with a letter and contain only letters, numbers, and underscores"
  )
  .refine(
    (val) => !val.includes("__"),
    "Username cannot contain consecutive underscores"
  );

export const signUpFormSchema = signInFormSchema.extend({
  username: usernameSchema,
});

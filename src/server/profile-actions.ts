'use server';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email(),
  bio: z.string().optional(),
});

export async function profileAction(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const result = schema.safeParse(values);

  if (!result.success) {
    console.error("Validation failed", result.error.flatten().fieldErrors);
    // You can also redirect with error or re-render with cookies if needed
    return;
  }

  const { name, username, email, bio } = result.data;

  // Save to DB here...
  console.log("✅ Saving to DB:", { name, username, email, bio });
}

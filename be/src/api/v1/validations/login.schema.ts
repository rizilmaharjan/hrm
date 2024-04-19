import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z
      .string()
      .trim()
      .min(1, { message: "username is required" })
      .max(20, { message: "password cannot be more than 20 characters" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "password is required" })
      .max(80, { message: "password cannot be more than 80 characters" }),
  }),
});

// extracting the type
export type TLoginSchema = z.infer<typeof loginSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .max(20, { message: "Username must be less that 20 character" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .max(80, { message: "Password must be less than 80 character" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

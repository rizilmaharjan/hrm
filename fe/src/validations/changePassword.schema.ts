import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(1, { message: "Required" })
      .max(20, { message: "password cannot be more than 20 characters" }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "Required" })
      .max(80, { message: "password cannot be more than 80 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Required" })
      .max(80, { message: "password cannot be more than 80 characters" }),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

// extracting the type
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

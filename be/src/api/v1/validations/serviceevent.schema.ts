import { z } from "zod";

export const serviceEventSchema = z.object({
  body: z.object({
    SERVICE_EVENT_CD: z
      .string()
      .trim()
      .min(1, { message: "code is required" })
      .max(2, { message: "code should be under 2 characters" }),
    SERVICE_EVENT_DESC: z
      .string()
      .trim()
      .min(1, { message: "description is required" })
      .max(100, { message: "description should be under 100 character" }),
    SERVICE_EVENT_DESC_NEP: z.string().trim().max(100, {
      message: "nepali description should be under 100 characters",
    }),
    DISABLED: z
      .string()
      .trim()
      .min(1, { message: "disabled is required" })
      .max(100, { message: "description should be 1 character" }),

    SERVICE_EVENT_TYPE: z
      .string()
      .trim()
      .max(1, { message: "event type should be 1 character" }),
    SALARY_ADJUST: z
      .string()
      .max(1, { message: "salary adjust should be 1 character" }),
  }),
});

// extracting the type
export type TServiceEventSchema = z.infer<typeof serviceEventSchema>;

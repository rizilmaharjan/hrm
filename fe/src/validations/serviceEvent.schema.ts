import { z } from "zod";

export const serviceEvent = z.object({
  SERVICE_EVENT_CD: z
    .string()
    .trim()
    .min(1, { message: "Service Event is required" })
    .max(2, { message: "Code must be less than 2 character" }),
  SERVICE_EVENT_DESC: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(100, { message: "Code must be less than 100 characters" }),
  SERVICE_EVENT_DESC_NEP: z.string().optional(),
  DISABLED: z.string().max(1, { message: "This field is required" }),
  SERVICE_EVENT_TYPE: z.string().max(1, { message: "Event type is required" }),
  IS_AUTO_SALARY_ADJUST: z.string().max(1),
});

import { z } from "zod";

export const jobTypeSchema = z.object({
  job_type_cd: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(2, { message: "Max 2 chars." }),
  job_type_desc: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(50, { message: "Description should be under 100 character" }),
  tax: z.string().trim().min(1, { message: "tax is required" }).max(1, {
    message: "Tax should be 1 character",
  }),
  tax_percent: z
    .union([z.number().int().positive().min(1), z.string()])
    .optional(),

  pf_allowed: z.boolean(),

  cit: z.boolean(),

  pay_generate: z.boolean(),

  grade_allowed: z.boolean(),
  single_rebate: z.union([z.number().int().positive(), z.string()]).optional(),
  married_rebate: z.union([z.number().int().positive(), z.string()]).optional(),
  disabled: z.boolean(),
});

// extracting the type
export type TJobTypeSchema = z.infer<typeof jobTypeSchema>;

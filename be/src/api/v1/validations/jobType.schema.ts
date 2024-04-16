import { z } from "zod";

export const jobTypeSchema = z.object({
  body: z.object({
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
    tax_percent: z.union([z.number().int().positive(), z.string()]).optional(),

    pf_allowed: z
      .string()
      .trim()
      .min(1, { message: "pf is required" })
      .max(1, { message: "pf should be 1 character" }),

    cit: z
      .string()
      .trim()
      .min(1, { message: "cit is required" })
      .max(1, { message: "cit should be 1 character" }),

    pay_generate: z
      .string()
      .trim()
      .min(1, { message: "pay generate is required" })
      .max(1, { message: "pay generate should be 1 character" }),

    grade_allowed: z
      .string()
      .trim()
      .min(1, { message: "grade allowed is required" })
      .max(1, { message: "grade allowed should be 1 character" }),
    single_rebate: z
      .union([z.number().int().positive(), z.string()])
      .optional(),
    married_rebate: z
      .union([z.number().int().positive(), z.string()])
      .optional(),
    disabled: z
      .string()
      .trim()
      .min(1, { message: "disabled is required" })
      .max(1, { message: "disabled should be 1 character" }),
  }),
});

// extracting the type
export type TJobTypeSchema = z.infer<typeof jobTypeSchema>;

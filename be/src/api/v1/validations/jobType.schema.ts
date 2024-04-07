import { z } from "zod";

export const jobTypeSchema = z.object({
  body: z.object({
    job_type_cd: z
      .string()
      .trim()
      .min(1, { message: "code is required" })
      .max(2, { message: "code should be under 2 characters" }),
    job_type_desc: z
      .string()
      .trim()
      .min(1, { message: "description is required" })
      .max(50, { message: "description should be under 100 character" }),
    tax: z.string().trim().min(1, { message: "tax is required" }).max(1, {
      message: "tax should be 1 character",
    }),
    tax_percent: z
      .number()
      .max(999.99, { message: "tax percent should be between 1 and 999.99" }),

    pf_allowed: z
      .string()
      .trim()
      .min(1, { message: "pf is required" })

      .max(1, { message: "[f] should be 1 character" }),

    cit: z
      .string()
      .trim()
      .min(1, { message: "cit is required" })
      .max(1, { message: "cit should be 1 character" }),

    pay_generate: z
      .string()
      .trim()
      .max(1, { message: "pay generate should be 1 character" }),

    grade_allowed: z
      .string()
      .trim()
      .max(1, { message: "grade allowed should be 1 character" }),
    single_rebate: z
      .number()
      .max(99999999.99, {
        message: "single rebate should be between 1 and 99999999.99",
      }),
    married_rebate: z
      .number()
      .max(99999999.99, {
        message: "single rebate should be between 1 and 99999999.99",
      }),
    disabled: z
      .string()
      .trim()
      .min(1, { message: "disabled is required" })
      .max(1, { message: "disabled should be 1 character" }),
  }),
});

// extracting the type
export type TJobTypeSchema = z.infer<typeof jobTypeSchema>;

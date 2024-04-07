import { z } from "zod";

export const allowanceSchema = z.object({
  body: z.object({
    allowance_CD: z
      .string()
      .trim()
      .min(1, { message: "code is required" })
      .max(3, { message: "allowance should be under 3 characters" }),
    allowance_facility: z
      .string()
      .trim()
      .min(1, { message: "facility is required" })
      .max(1, { message: "facility should be 1 character" }),
    allowance_description: z
      .string()
      .trim()
      .min(1, { message: "description is required" })
      .max(100, { message: "description should be under 100 characters" }),
    allowance_nepali_desc: z
      .string()
      .trim()
      .max(100, { message: "description should be under 100 characters" }),
    allowance_taxable: z
      .string()
      .trim()
      .min(1, { message: "taxable is required" })
      .max(1, { message: "taxable should be 1 character" }),
    allowance_facility_percent: z
      .number()
      .max(999.99, { message: "facility percent should be between 1 and 99" }),
    allowance_cit: z
      .string()
      .trim()
      .max(1, { message: "CIT flag should be 1 character" }),
    allowance_type: z
      .string()
      .trim()
      .min(1, { message: "allowance type is required" })
      .max(1, { message: "allowance should be 1 character" }),
    salary_allowance_flag: z
      .string()
      .trim()
      .max(1, { message: "salary allowance flag should be 1 character" }),
    allowance_acc: z
      .string()
      .trim()
      .max(30, { message: "allowance_acc should be under 30 characters" }),
    allowance_disabled: z
      .string()
      .trim()
      .min(1, { message: "disabled is required" })
      .max(1, { message: "disabled should be 1 character" }),
  }),
});

// extracting the type
export type TAllowanceSchema = z.infer<typeof allowanceSchema>;

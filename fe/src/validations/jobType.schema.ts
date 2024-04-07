import { z } from "zod";
export const jobTypeSchema = z.object({
  job_type_cd: z
    .string()
    .toUpperCase()
    .trim()
    .min(1, { message: "required" })
    .max(2, { message: "Code must be less than 2 characters" }),
  job_type_desc: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .max(50, "Description must be less than 50 characters"),
  tax: z.string().min(1, { message: "required" }).max(1),
  pf_allowed: z.string().max(1),
  cit: z.string().max(1),
  disabled: z.string().max(1),
  pay_generate: z.string().max(1).optional(),
  tax_percent: z.string().optional(),
  single_rebate: z.number().optional(),
  married_rebate: z.number().optional(),
  grade_allowed: z.string().max(1).optional(),
  is_job_expire_date: z.string().max(1).optional(),
  job_expire_months: z.number().optional(),
  is_social_security_fund: z.string().max(1).optional(),
  job_type_group: z.string().optional(),
});

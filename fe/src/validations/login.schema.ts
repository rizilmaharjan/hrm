import * as Yup from "yup";
import { z } from "zod";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  hashedPassword: Yup.string().required("Password is required"),
});

export const jobTypeSchema = z.object({
  job_type_cd: z
    .string()
    .trim()
    .min(1)
    .max(2, "Code must be less than 2 characters"),
  job_type_desc: z
    .string()
    .max(50, "Description must be less than 50 characters"),
  tax: z.string().max(1),
  pf_allowed: z.string().max(1),
  cit: z.string().max(1),
  disabled: z.string().max(1),
  pay_generate: z.string(),
  tax_percent: z.string(),
  single_rebate: z.number(),
  married_rebate: z.number(),
  grade_allowed: z.string().max(1),
  is_job_expire_date: z.string().max(1),
  job_expire_months: z.number(),
  is_social_security_fund: z.string().max(1),
  job_type_group: z.string(),
});

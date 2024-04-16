import { z } from "zod";

export const allowanceSchema = z.object({
  allowance_CD: z
    .string()
    .trim()
    .min(3, { message: "Min. 3 char." })
    .max(3, { message: "Code must be less than 3 character" }),
  allowance_description: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(100, { message: "Description must be less than 100 characters" }),
  allowance_nepali_desc: z
    .string()
    .max(100, { message: "Description must be less than 100 characters" })
    .optional(),
  allowance_facility: z
    .string()
    .max(1, { message: "Allowance facility is required" })
    .max(1),
  allowance_taxable: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(1, { message: "Taxable should be under 1 character" }),
  allowance_facility_percent: z
    .union([z.number().int().positive(), z.string()])
    .optional(),
  // allowance_facility_percent: z
  //   .number()
  //   .max(999.99, { message: "Facility % should be between 1 and 999" })
  //   .optional(),
  allowance_cit_flag: z.boolean(),
  allowance_type: z
    .string()
    .trim()
    .max(1, { message: "Allowance type is required" }),
  salary_allowance_flag: z.boolean(),
  allowance_acc_cd: z
    .string()
    .trim()
    .max(30, { message: "Allowance Acc should be 30 characters" }),
  allowance_disabled: z.boolean(),
});

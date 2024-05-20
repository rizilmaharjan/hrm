import { z } from "zod";

export const payrollSchema = z.object({
  fiscalYr: z.string().trim(),
  voucherNo: z.string(),
  processMonth: z.string(),
});

export type TPayrollSchema = z.infer<typeof payrollSchema>;

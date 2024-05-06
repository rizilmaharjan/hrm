import { z } from "zod";

export const reportSchema = z.object({
  fiscalYr: z.string(),
  voucherNo: z.string().optional(),
  processMonth: z.string().optional(),
  office: z.string(),
  department: z.string(),
  position: z.string(),
  destination: z.string(),
});

export type TReportSchema = z.infer<typeof reportSchema>;

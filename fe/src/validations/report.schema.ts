import * as z from "zod";

const reportSchema = z.object({
  fiscalYr: z.string(),
  voucherNo: z.string().optional(),
  processMonth: z.string().optional(),
  office: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  destination: z.string(),
});

export type TReportSchema = z.infer<typeof reportSchema>;

export { reportSchema };

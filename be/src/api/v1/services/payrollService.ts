import * as PayrollModel from "../models/payrollModel";

export const getPayroll = async (
  fiscal_yr: string,
  process_month: string,
  pay_vch_no: number
) => {
  try {
    const res = await PayrollModel.getPayroll(
      fiscal_yr,
      process_month,
      pay_vch_no
    );
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

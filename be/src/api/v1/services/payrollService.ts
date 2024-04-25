import * as PayrollModel from "../models/payrollModel";

export const getPayroll = async () => {
  try {
    const res = await PayrollModel.getPayroll();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

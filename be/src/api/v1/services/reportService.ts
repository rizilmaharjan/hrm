import * as ReportModel from "../models/reportModel";

export const getFiscalYr = async () => {
  try {
    const res = await ReportModel.getFiscalYr();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPayMonth = async () => {
  try {
    const res = await ReportModel.getPayMonth();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getVoucherNo = async (
  fiscal_yr: string,
  process_month?: string
) => {
  try {
    const res = await ReportModel.getVoucherNo(fiscal_yr, process_month);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

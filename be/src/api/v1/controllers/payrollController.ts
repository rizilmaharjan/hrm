import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";

import * as PayrollService from "../services/payrollService";
import { appError } from "../helpers/appError";

export const getPayroll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("controller");
    const fiscal_yr: string = (req.query.fiscal_yr as string) || "";
    const process_month = (req.query.process_month as string) || "";
    const pay_vch_no = Number(req.query.pay_vch_no);
    // console.log("PayrollformData", fiscal_yr, process_month, pay_vch_no);
    const { status, message, data } = await PayrollService.getPayroll(
      fiscal_yr,
      process_month,
      pay_vch_no
    );
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

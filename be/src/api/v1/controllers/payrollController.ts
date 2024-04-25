import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";

import * as PayrollService from "../services/payrollService";
import { appError } from "../helpers/appError";

export const getPayroll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const fiscal_yr = req.query.fiscalYr;
    // const pay_vch_no = req.query.voucherNo;
    // const processs_month = req.query.processMonth;
    const { status, message, data } = await PayrollService.getPayroll();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

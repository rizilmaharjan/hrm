import e, { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import * as ReportService from "../services/reportService";
import { appError } from "../helpers/appError";

export const getFiscalYr = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await ReportService.getFiscalYr();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

export const getPayMonth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await ReportService.getPayMonth();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

export const getVoucherNo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fiscal_yr: string = (req.query.fiscal_yr as string) || "";
    const process_month = req.query.process_month as string;
    console.log("Voucher No:", fiscal_yr, process_month);
    const { status, message, data } = await ReportService.getVoucherNo(
      fiscal_yr,
      process_month
    );
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

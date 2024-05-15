import { Request, Response, NextFunction } from "express";
import * as EmployeeService from "../services/employeeService";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const getEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pageNumber = Number(req.query.page) || 1;
    const pageSize = Number(req.query.limit) || 20;
    const { status, message, employees, rowCount } =
      await EmployeeService.getEmployee(pageNumber, pageSize);
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, employees, rowCount });
  }
);

export const getEmployeeById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await EmployeeService.getEmployeeById(id);
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

// edit employee info
export const editEmployeeInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const employeeId = id;
    const employeeInfo = req.body;
    console.log("this is employee info", employeeInfo);
    const { status, message } = await EmployeeService.editEmployee(
      employeeId,
      employeeInfo
    );
    return res.status(status).json({ message });
  }
);

import * as EmployeeModel from "../models/employeeModel";

export const getEmployee = async (pageNumber: number, pageSize: number) => {
  try {
    const res = await EmployeeModel.getEmployee(pageNumber, pageSize);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const res = await EmployeeModel.getEmployeeById(id);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

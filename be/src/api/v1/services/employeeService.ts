import * as EmployeeModel from "../models/employeeModel";

export const getEmployee = async (pageNumber: number, pageSize: number) => {
  try {
    const res = await EmployeeModel.getEmployee(pageNumber, pageSize);
    return res;
  } catch (error: any) {
    console.log("get employee error", error);
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

// edit employee info
export const editEmployee = async (employeeId: string, employeeInfo: any) => {
  try {
    const res = await EmployeeModel.updateEmployeeInfo(
      employeeId,
      employeeInfo
    );
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

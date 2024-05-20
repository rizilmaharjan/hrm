import * as DropdownModel from "../models/dropdownModel";

export const getLeaveType = async () => {
  try {
    const res = await DropdownModel.getLeaveType();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

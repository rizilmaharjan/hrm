import * as leaveService from "../models/applyLeaveModel";
export const applyLeave = async (leaveData: any) => {
  try {
    const res = await leaveService.applyLeave(leaveData);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getLeave = async (username: string) => {
  try {
    const res = await leaveService.getLeave(username);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const deleteLeave = async (id: string) => {
  try {
    const res = await leaveService.deleteLeave(id);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateLeave = async (body: any, id: string) => {
  try {
    const res = await leaveService.updateLeave(body, id);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

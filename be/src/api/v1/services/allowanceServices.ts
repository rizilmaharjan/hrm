import {
  deleteAllowance,
  getAllowances,
  postAllowance,
  updateAllowance,
} from "../models/allowanceModel";

export const createAllowance = async (
  service: any
): Promise<{ status: number; message: string; data?: any }> => {
  try {
    const response = await postAllowance(service);
    return response;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

export const getAllAllowances = async (
  search?: string
): Promise<{
  status: number;
  message: string;
  allowance?: any;
}> => {
  try {
    const response = await getAllowances(search);
    return response;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

export const allowanceDelete = async (
  id: string
): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await deleteAllowance(id);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};
export const allowanceUpdate = async (
  allowance: any,
  id: string
): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await updateAllowance(allowance, id);
    return response;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

import {
  deleteService,
  getServices,
  postService,
  updateService,
} from "../models/serviceEventModel";

export const createService = async (
  service: any
): Promise<{ status: number; message: string; data?: any }> => {
  try {
    const response = await postService(service);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const getAllServiceEvents = async (): Promise<{
  status: number;
  message: string;
  serviceEvents?: any;
}> => {
  try {
    const response = await getServices();
    return response;
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const serviceDelete = async (
  id: string
): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await deleteService(id);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};
export const serviceUpdate = async (
  service: any,
  id: string
): Promise<{
  status: number;
  message: string;
  users?: any;
}> => {
  try {
    const response = await updateService(service, id);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

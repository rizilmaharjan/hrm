import { TJobType } from "../interfaces/types/jobtype.types";

import * as JobTypeRepository from "../models/jobTypeModel";

export const postJobType = async (body: TJobType) => {
  try {
    const resopnse = await JobTypeRepository.postJobType(body);
    return resopnse;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

export const getJobType = async () => {
  try {
    const resopnse = await JobTypeRepository.getJobType();
    return resopnse;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

export const deleteJobType = async (id: string) => {
  try {
    const resopnse = await JobTypeRepository.deleteJobType(id);
    return resopnse;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

export const updateJobType = async (id: string, data: TJobType) => {
  try {
    const resopnse = await JobTypeRepository.updateJobType(id, data);
    return resopnse;
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

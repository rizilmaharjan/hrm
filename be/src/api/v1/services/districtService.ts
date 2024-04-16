import { TDistrict } from "../interfaces/types/district.types";
import * as DistrictModel from "../models/districtModel";

export const postDistrict = async (body: TDistrict) => {
  try {
    const res = await DistrictModel.postDistrict(body);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDistrict = async () => {
  try {
    const res = await DistrictModel.getDistrict();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteDistrict = async (id: string) => {
  try {
    const res = await DistrictModel.deleteDistrict(id);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateDistrict = async (id: string, body: TDistrict) => {
  try {
    const res = await DistrictModel.updateDistrict(id, body);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

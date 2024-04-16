import { TReligion } from "../interfaces/types/religion.types";
import * as ReligionModal from "../models/religionModal";

export const postReligion = async (data: TReligion) => {
  try {
    const res = await ReligionModal.postReligion(data);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getReligion = async () => {
  try {
    const res = await ReligionModal.getReligion();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteReligion = async (id: string) => {
  try {
    const res = await ReligionModal.deleteReligion(id);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateReligion = async (id: string, body: TReligion) => {
  try {
    const res = await ReligionModal.updateReligion(id, body);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

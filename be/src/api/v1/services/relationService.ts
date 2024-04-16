import { TRelation } from "../interfaces/types/relation.types";
import * as RelationModel from "../models/relationModel";

export const postRelation = async (body: TRelation) => {
  try {
    const res = await RelationModel.postRelation(body);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRelation = async () => {
  try {
    const res = await RelationModel.getRelation();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteRelation = async (id: string) => {
  try {
    const res = await RelationModel.deleteRelation(id);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRelation = async (id: string, body: TRelation) => {
  try {
    const res = await RelationModel.updateRelation(id, body);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

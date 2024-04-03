import { TPosition } from "../../types";
import * as PositionRepository from "../repository/index";

export const postPosition = async (body: TPosition) => {
  try {
    const response = await PositionRepository.postPosition(body);
    return response;
  } catch (error: any) {
    return { status: 400, message: error.message };
  }
};

export const getPosition = async () => {
  try {
    const response = await PositionRepository.getPosition();
    return response;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

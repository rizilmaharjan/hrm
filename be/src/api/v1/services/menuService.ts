import * as MenuModal from "../models/menuModal";
export const getMenu = async () => {
  try {
    const response = await MenuModal.getMenu();
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import * as AccountService from "../models/accountModel";

export const getAccount = async () => {
  try {
    const res = await AccountService.getAccount();
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

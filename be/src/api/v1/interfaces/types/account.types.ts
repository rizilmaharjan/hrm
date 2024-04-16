export type AccMstData = {
  ACC_CD: string;
  ACC_DESC: string;
  ACC_DESC_NEP?: string;
  UPPER_ACC_CD?: string;
  CASH_BANK_FLAG: string;
  GROUP_DETAIL_FLAG: string;
  COMPUTER_ACC_CD?: string;
  ANNEX?: string;
  MAIN_GROUP_CD?: string;
  SUB_GROUP_CD?: string;
  GROUP_CD?: string;
  TEMP_ACC_CD?: string;
  ACC_TYPE?: string;
  LEVEL_NO?: number;
  DISABLED: string;
  ENTERED_BY: string;
  ENTERED_DT: string; // Assuming date in ISO format (YYYY-MM-DD)
  ENTERED_DT_NEP: string;
  SCHEDULE?: string;
  BALANCE_PL_FLAG?: string;
  INV_FLAG?: string;
  DR_CR_FLAG?: string;
  RESTRICT_TYPE?: string;
  IS_INTERUNIT_ACC?: string;
  OFFICE_CD?: string;
  SUB_ACC_TYPE_CD?: string;
};

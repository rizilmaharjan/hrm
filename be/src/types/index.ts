export type TJobType = {
  job_type_cd: string;
  job_type_desc: string;
  tax: string;
  pf_allowed: string;
  cit: string;
  disabled: string;
  entered_by: string;
  entered_dt?: Date;
  pay_generate?: string;
  tax_percent?: number;
  single_rebate?: number;
  married_rebate?: number;
  grade_allowed?: string;
  is_job_expire_date?: string;
  job_expire_months?: number;
  is_social_security_fund?: string;
  job_type_group?: string;
};

export type TPosition = {
  position_cd: string;
  position_desc: string;
  position_desc_nep?: string;
  upper_position_cd?: string;
  group_flag: string;
  disabled: string;
  entered_by: string;
  order_no: number;
  computer_position_cd?: string;
  new_position_cd?: string;
};

export type TJobType = {
  job_type_cd: string;
  job_type_desc: string;
  tax: string;
  pf_allowed: string | boolean;
  cit: string | boolean;
  disabled: string | boolean;
  entered_by: string;
  entered_dt?: Date;
  pay_generate: string | boolean;
  tax_percent: string;
  single_rebate: string;
  married_rebate: string;
  grade_allowed: string | boolean;
  is_job_expire_date: string;
  job_expire_months: number;
  is_social_security_fund: string;
  job_type_group: string;
};

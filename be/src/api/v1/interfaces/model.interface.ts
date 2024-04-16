export interface ExecuteResultService {
  outBinds?: {
    new_service_event_cd: string[];
    new_event_desc: string[];
    new_event_desc_nep: string[];
    new_disabled: string[];
    new_service_event_type: string[];
    new_service_salary_adjust: string[];
  };
}

export interface ExecuteResultAllowance {
  outBinds?: {
    new_allowance_cd: string[];
    new_allowance_desc: string[];
    new_allowance_desc_nep: string[];
    new_taxable: string[];
    new_facility_percent: string[];
    new_cit_flag: string[];
    new_allowance_type: string[];
    new_allowance_facility: string[];
    new_salary_allowance_flag: string[];
    new_acc_cd: string[];
    new_disabled: string[];
  };
}

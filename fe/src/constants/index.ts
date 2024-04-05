import {
  AllowanceIcon,
  ClockIcon,
  DollarSignIcon,
  EmployeeIcon,
  HomeIcon,
  JobTypeIcon,
  ServiceEventIcon,
} from "../assets/svg";
import { TsidebarItems } from "../interfaces/types/sidebar.types";

export const sidebarItems: TsidebarItems[] = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    title: "Employee",
    icon: EmployeeIcon,
    path: "/employee",
  },
  {
    title: "Payroll",
    icon: DollarSignIcon,
    path: "/payroll",
  },
  {
    title: "Attendence",
    icon: ClockIcon,
    path: "/attendence",
  },
  {
    title: "Service Event",
    icon: ServiceEventIcon,
    path: "/service-event",
  },
  {
    title: "Allowance",
    icon: AllowanceIcon,
    path: "/allowance",
  },
  {
    title: "Job Type",
    icon: JobTypeIcon,
    path: "/job-type",
  },
];

export const accountList = [
  {
    acc_cd: "2.111",
    dsp_acc_desc: "Dashain Allowance",
  },
  {
    acc_cd: "2.112",
    dsp_acc_desc: "Salary",
  },
  {
    acc_cd: "2.113",
    dsp_acc_desc: "Stipend",
  },
  {
    acc_cd: "2.114",
    dsp_acc_desc: "Overtime",
  },
  {
    acc_cd: "2.115",
    dsp_acc_desc: "Medical Benefit",
  },
  {
    acc_cd: "2.116",
    dsp_acc_desc: "Gratuity",
  },
  {
    acc_cd: "2.117",
    dsp_acc_desc: "Staff Wellfare",
  },
  {
    acc_cd: "2.118",
    dsp_acc_desc: "Examination Expenses",
  },
  {
    acc_cd: "2.119",
    dsp_acc_desc: "Allowances & Facilities",
  },
  {
    acc_cd: "2.120",
    dsp_acc_desc: "Pensions",
  },
  {
    acc_cd: "2.121",
    dsp_acc_desc: "Appron Allowance",
  },
];

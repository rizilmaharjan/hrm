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

export const allowanceTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-1/12",
  },
  {
    id: 2,
    title: "Description",
    width: "w-2/12",
  },
  {
    id: 3,
    title: "Description (in Nepali)",
    width: "w-1/12",
  },
  {
    id: 4,
    title: "Taxable",
    width: "w-1/12",
  },
  {
    id: 5,
    title: "Facility(%)",
    width: "w-1/12",
  },
  {
    id: 6,
    title: "Deduct CIT",
    width: "w-1/12",
  },
  {
    id: 7,
    title: "Type",
    width: "w-1/12",
  },
  {
    id: 8,
    title: "Salary + Allowance Flag",
    width: "w-1/12",
  },
  {
    id: 9,
    title: "A/C",
    width: "w-1/12",
  },
  {
    id: 9,
    title: "Disabled",
    width: "w-1/12",
  },
];

export const jobTypeTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-1/12",
  },
  {
    id: 2,
    title: "Description",
    width: "w-1/12",
  },
  {
    id: 3,
    title: "Tax Applicable?",
    width: "w-1/12",
  },
  {
    id: 4,
    title: "Flat %",
    width: "w-1/12",
  },
  {
    id: 5,
    title: "PF",
    width: "w-1/12",
  },
  {
    id: 6,
    title: "CIT",
    width: "w-1/12",
  },
  {
    id: 7,
    title: "Pay Gen.",
    width: "w-1/12",
  },
  {
    id: 8,
    title: "Is Grade",
    width: "w-1/12",
  },
  {
    id: 9,
    title: "Single Rebate",
    width: "w-1/12",
  },
  {
    id: 10,
    title: "Married Rebate",
    width: "w-1/12",
  },
  {
    id: 11,
    title: "Disabled",
    width: "w-1/12",
  },
];

export const serviceEventTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-1/12",
  },
  {
    id: 2,
    title: "Description",
    width: "w-3/12",
  },
  {
    id: 3,
    title: "Description (in Nepali)",
    width: "w-3/12",
  },
  {
    id: 4,
    title: "Type",
    width: "w-2/12",
  },
  {
    id: 5,
    title: "Salary Adjust",
    width: "w-2/12",
  },
  {
    id: 6,
    title: "Disabled",
    width: "w-1/12",
  },
];

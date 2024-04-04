import { ReactNode } from "react";
import {
  AllowanceIcon,
  ClockIcon,
  DollarSignIcon,
  EmployeeIcon,
  HomeIcon,
  JobTypeIcon,
  ServiceEventIcon,
} from "../assets/svg";

type TnavbarItems = {
  title: string;
  icon: () => ReactNode;
  path: string;
};

export const navbarItems: TnavbarItems[] = [
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
    path: "/service-events",
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

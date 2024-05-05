// import Profile from "../components/Profile";
import AccountInfoSection from "../components/Profile/AccountInfoSection";
import PayrollInfoSection from "../components/Profile/PayrollInfoSection";
import PersonalInfoSection from "../components/Profile/PersonalInfoSection";
import Allowance from "../pages/Allowance";
import Attendence from "../pages/Attendence";
import ChangePassword from "../pages/ChangePassword";
import Dashboard from "../pages/Dashboard";
import Employee from "../pages/Employee";
import JobType from "../pages/JobType";
import Login from "../pages/Login";
import Payroll from "../pages/Payroll";
import Position from "../pages/Position";
import ServiceEvent from "../pages/ServiceEvent";
import UserProfile from "../pages/UserProfile";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  children?: RouteConfig[];
}

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  // {
  //   path: "/employee/:id",
  //   element: <Profile />,
  // },
  {
    path: "/payroll",
    element: <Payroll />,
  },
  {
    path: "/attendence",
    element: <Attendence />,
  },
  {
    path: "/service-event",
    element: <ServiceEvent />,
  },
  {
    path: "/allowance",
    element: <Allowance />,
  },
  {
    path: "/position",
    element: <Position />,
  },
  {
    path: "/job-type",
    element: <JobType />,
  },
  {
    path: "/employee",
    element: <UserProfile />,
    children: [
      {
        path: "profile/:id", // Nested under /user/profile/personal-info
        element: <PersonalInfoSection />,
      },
      {
        path: "account-info/:id",
        element: <AccountInfoSection />,
      },
      {
        path: "payroll-info/:id",
        element: <PayrollInfoSection />,
      },
    ],
  },
];

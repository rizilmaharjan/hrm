import Profile from "../components/Profile";
import Allowance from "../pages/Allowance";
import Attendence from "../pages/Attendence";
import Dashboard from "../pages/Dashboard";
import Employee from "../pages/Employee";
import JobType from "../pages/JobType";
import Login from "../pages/Login";
import Payroll from "../pages/Payroll";
import Position from "../pages/Position";
import ServiceEvent from "../pages/ServiceEvent";

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
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
    path: "/user/profile",
    element: <Profile />,
  },
];

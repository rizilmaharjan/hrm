import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Relationship from "./pages/Relationship";
// import Service from "./pages/Service";
import MainLayout from "./layout/MainLayout";
import ServiceEvent from "./pages/ServiceEvent";
import Login from "./pages/Login";
import Private from "./layout/Private";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Allowance from "./pages/Allowance";
import JobType from "./pages/JobType";
import Employee from "./pages/Employee";
import Payroll from "./pages/Payroll";
import Attendence from "./pages/Attendence";
// import ProfileLayout from "./components/ProfileLayout";

export default function App() {
  return (
    <>
      <Routes>
        {/* <Relationship /> */}
        <Route element={<Private />}>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service-events" element={<ServiceEvent />} />
            <Route path="/allowance" element={<Allowance />} />
            {/* <Route element={<ProfileLayout />}> */}
            <Route path="/employee" element={<Employee />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/attendence" element={<Attendence />} />

            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/job-type" element={<JobType />} />
            {/* </Route> */}
            {/* <Route path="/service-event/create" element={<Service />} /> */}
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

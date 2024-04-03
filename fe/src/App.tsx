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
            <Route path="/user/profile" element={<UserProfile />} />
            {/* </Route> */}
            {/* <Route path="/service-event/create" element={<Service />} /> */}
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

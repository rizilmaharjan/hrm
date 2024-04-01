import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <div className="min-h-screen">
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

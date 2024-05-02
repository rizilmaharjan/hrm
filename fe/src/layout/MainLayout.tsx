import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default function MainLayout() {
  return (
    <>
      <div className="fixed inset-0">
        <Navbar />
        <div className="flex h-full">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

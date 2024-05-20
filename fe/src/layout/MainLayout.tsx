import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../redux/hooks";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { useEffect } from "react";

export default function MainLayout() {
  const { currentUser } = useAppSelector((state) => state.user);
  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  return (
    <>
      <div className="fixed inset-0">
        <Navbar />
        <div className="flex h-full">
          <div className="">
            {currentUser?.role === "admin" ? <Sidebar /> : <EmployeeSidebar />}
          </div>
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

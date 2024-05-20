import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmployeeSidebar from "../components/EmployeeSidebar";

export default function MainLayout() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // Determine if the user is an admin or an employee
  const isAdmin = user && user.currentUser && user.currentUser.USER_CD;
  const isEmployee = user && user.currentUser && user.currentUser.EMPLOYEE_CD;

  return (
    <>
      <div className="fixed inset-0">
        <Navbar />
        <div className="flex h-full">
          <div className="">
            {isAdmin ? (
              <Sidebar />
            ) : isEmployee ? (
              <EmployeeSidebar />
            ) : (
              <Sidebar />
            )}
          </div>
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

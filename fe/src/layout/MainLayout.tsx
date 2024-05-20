import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmployeeSidebar from "../components/EmployeeSidebar";

export default function MainLayout() {
  const userString = localStorage.getItem("user");
  console.log("Raw userString from localStorage:", userString);

  let user = null;

  if (userString) {
    try {
      const parsedOuter = JSON.parse(userString);
      user = JSON.parse(parsedOuter.user);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  console.log("Parsed user object:", user);

  // Determine if the user is an admin or an employee
  const isAdmin = user && user.currentUser && user.currentUser.role === "admin";
  const isEmployee =
    user && user.currentUser && user.currentUser.role === "employee";

  return (
    <>
      <div className="fixed inset-0">
        <Navbar />
        <div className="flex h-full">
          <div className="">
            {
              isAdmin ? <Sidebar /> : isEmployee ? <EmployeeSidebar /> : null // Or you can render a default component or message here
            }
          </div>
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

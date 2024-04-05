import { Instance } from "../utils/Instance";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/user/userSlice";
import { LogoutIcon } from "../assets/svg";
import { sidebarItems } from "../constants";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const res = await Instance.get("/v1/auth/logout");
      dispatch(logout());
      // localStorage.removeItem("username");
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className=" w-14 sm:w-64 h-full transform"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#111827]">
          <ul className="space-y-2 font-medium ">
            {sidebarItems.map((item) => (
              <li
                key={item.title}
                className=" text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " flex items-center font-bold p-2 rounded-lg bg-gray-600"
                      : "flex items-center p-2"
                  }
                  to={item.path}
                >
                  {item.icon()}
                  <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                    {item.title}
                  </span>
                </NavLink>
              </li>
            ))}
            {/* <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-bold p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-700"
                  : ""
              }
            >
              <li className="flex items-center">
                <HomeIcon />
                <span className="ms-3 hidden sm:block">Dashboard</span>
              </li>
            </NavLink>
            <li className="p-2 rounded-lg text-white hover:bg-gray-700">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex item-center font-bold bg-gray-700 rounded-lg"
                    : "flex item-center font-bold"
                }
                to="/employee"
              >
                <EmployeeIcon />
                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Employee
                </span>
              </NavLink>
            </li>
            <li className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <NavLink className="flex items-center" to="/payroll">
                <DollarSignIcon />
                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Payroll
                </span>
              </NavLink>
            </li>

            <li className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <NavLink className="flex items-center" to="/attendence">
                <ClockIcon />
                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Attendence
                </span>
              </NavLink>
            </li>
            <li className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <NavLink className="flex items-center" to="/service-events">
                <ServiceEventIcon />
                <span className="ms-3 hidden sm:block">Services</span>
              </NavLink>
            </li>
            <li className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <NavLink className="flex items-center" to="/allowance">
                <AllowanceIcon />

                <span className="ms-3">Allowance</span>
              </NavLink>
            </li>

            <li className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <NavLink className="flex items-center" to="/job-type">
                <JobTypeIcon />
                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Job Type
                </span>
              </NavLink>
            </li> */}

            <li
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                Log Out
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

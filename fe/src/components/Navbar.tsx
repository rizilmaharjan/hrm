import { RefObject, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { Instance } from "../utils/Instance";
import { useAppDispatch } from "../redux/hooks";
import { IconKey, LogoutIcon } from "../assets/svg";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dropDownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (!dropDownRef.current?.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [openDropdown]);

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
    <nav className="border-gray-200 bg-[#111827] h-[10vh]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="favicon.ico" className="h-8" alt="HRM" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            HRM
          </span>
        </NavLink>

        <div className="relative" ref={dropDownRef}>
          <button
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:outline-none"
            type="button"
            onClick={() => setOpenDropdown(!openDropdown)}
            aria-expanded={openDropdown}
            aria-haspopup="true"
          >
            <img
              className="w-10 h-10 rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user photo"
            />
          </button>
          {/* Dropdown */}
          {openDropdown && (
            <div className="absolute z-10 right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <div className="px-4 py-3 text-sm text-gray-900">
                <Link onClick={() => setOpenDropdown(false)} to="profile">
                  <h2 className="text-lg font-bold text-center">John Doe</h2>
                </Link>
              </div>
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <Link
                    to="/change-password"
                    onClick={() => setOpenDropdown(false)}
                    className="flex items-center gap-4 px-4 py-2 text-sm text-gray-500  hover:bg-gray-100 cursor-pointer"
                  >
                    <IconKey className="h4 w-4" /> Change Password
                  </Link>
                </li>
              </ul>
              <div
                className="flex items-center gap-4 px-4 py-2 text-sm text-red-500  hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                <LogoutIcon className="h-4 w-4" /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import user from "/user.jpg";
import ToolTip from "./ToolTip";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="../../public/favicon.ico" className="h-8" alt="HRM" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HRM
          </span>
        </NavLink>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/user/profile")}
        >
          <img
            className="w-14 h-14 rounded-full cursor-pointer"
            src={user}
            alt="profile"
          />
          {showTooltip && <ToolTip />}
        </div>
      </div>
    </nav>
  );
}

import { NavLink } from "react-router-dom";
import { sidebarItems } from "../constants";

export default function Sidebar() {
  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="w-14 sm:w-64 h-full transform"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#111827]">
          <ul className="space-y-2 font-medium ">
            {sidebarItems.map((item) => (
              <li
                key={item.title}
                className="rounded-lg text-white hover:bg-gray-700 group"
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
          </ul>
        </div>
      </aside>
    </>
  );
}

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { employeeSidebar } from "../constants";
import { IconDown, IconUp } from "../assets/svg";

const EmployeeSidebar: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="w-14 sm:w-64 h-full transform"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-[#111827]">
        <ul className="space-y-2 font-medium">
          {employeeSidebar.map((item) => (
            <li key={item.id} className="rounded-lg text-white group">
              <div
                className="flex justify-between items-center rounded-lg cursor-pointer hover:bg-gray-500"
                onClick={() => handleItemClick(item.id)}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "w-full flex items-center font-bold p-2 rounded-lg bg-gray-500"
                      : "flex items-center p-2"
                  }
                  to={item.path}
                >
                  {item.icon()}
                  <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                    {item.title}
                  </span>
                </NavLink>
                {item.children && (
                  <span className="ml-2">
                    {openItemId === item.id ? <IconUp /> : <IconDown />}
                  </span>
                )}
              </div>
              {item.children && openItemId === item.id && (
                <ul className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <NavLink
                        to={child.path}
                        className={({ isActive }) =>
                          isActive
                            ? "w-full flex items-center font-bold p-2 rounded-lg text-gray-500 hover:text-gray-500"
                            : "flex items-center p-2 hover:text-gray-500"
                        }
                      >
                        {child.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;

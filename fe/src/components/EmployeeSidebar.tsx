import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { employeeSidebar } from "../constants";
import { IconDown, IconUp } from "../assets/svg";

const EmployeeSidebar: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-14 sm:w-64 h-full transform px-3 py-4 overflow-y-auto bg-[#111827]">
      <ul className="space-y-2 font-medium ">
        {employeeSidebar.map((item) => (
          <li
            key={item.id}
            className="rounded-lg text-white hover:bg-gray-700 group"
          >
            <div
              className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
              onClick={() => handleItemClick(item.id)}
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
                    <Link
                      to={child.path}
                      className="block p-2 rounded-lg hover:bg-gray-200"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeSidebar;

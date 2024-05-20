import React, { useState } from "react";
import { Link } from "react-router-dom";
import { employeeSidebar } from "../constants";
import { IconDown, IconUp } from "../assets/svg";

const EmployeeSidebar: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        {employeeSidebar.map((item) => (
          <li key={item.id}>
            <div
              className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => handleItemClick(item.id)}
            >
              <Link to={item.path} className="flex gap-4 items-center">
                {item.icon()} {item.title}
              </Link>
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

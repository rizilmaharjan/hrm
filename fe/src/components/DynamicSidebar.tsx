import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFetchData } from "../api";

export interface TMenu {
  insert_allowed: string;
  menu_cd: number;
  group_name: string;
  menu_type: string;
  design_menu_name: string;
  open_allowed: string;
  menu_desc: string;
  query_allowed: string;
  delete_allowed: string;
  update_allowed: string;
  form_name: string;
}

const DynamicSidebar = () => {
  const { data: menuData } = useFetchData("/v1/menu");
  const menuItem = menuData?.data;
  const mainMenu = menuItem?.filter(
    (item: TMenu) => item.group_name === "MAINMENU"
  );

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const toggleMenu = (menu_cd: number) => {
    setOpenMenu(openMenu === menu_cd ? null : menu_cd);
  };

  const toggleSubmenu = (menu_cd: number) => {
    setOpenSubmenu(openSubmenu === menu_cd ? null : menu_cd);
  };

  return (
    <div className="h-full w-full overflow-scroll">
      {mainMenu?.map((main: TMenu) => {
        const submenuItems = menuItem?.filter(
          (item: TMenu) => item.group_name === main.design_menu_name
        );

        return (
          <ul key={main.menu_cd}>
            <li className="font-bold text-xl cursor-pointer flex gap-6 items-center">
              <NavLink to={`/${main.design_menu_name}`}>
                {main.menu_desc}
              </NavLink>
              {submenuItems.length > 0 && (
                <span onClick={() => toggleMenu(main.menu_cd)}>
                  {openMenu === main.menu_cd ? "▲" : "▼"}
                </span>
              )}
            </li>
            {openMenu === main.menu_cd &&
              submenuItems.map((submenu: TMenu) => {
                const grandchildItems = menuItem?.filter(
                  (item: TMenu) => item.group_name === submenu.design_menu_name
                );

                return (
                  <React.Fragment key={submenu.menu_cd}>
                    <li className="text-lg ml-5 cursor-pointer flex gap-4 items-center">
                      <NavLink
                        to={`/${main.design_menu_name}/${submenu.design_menu_name}`}
                      >
                        - {submenu.menu_desc}
                      </NavLink>
                      {grandchildItems.length > 0 && (
                        <span onClick={() => toggleSubmenu(submenu.menu_cd)}>
                          {openSubmenu === submenu.menu_cd ? "▲" : "▼"}
                        </span>
                      )}
                    </li>
                    {openSubmenu === submenu.menu_cd &&
                      grandchildItems.map((grandchild: TMenu) => (
                        <li
                          className="text-sm ml-10 cursor-pointer"
                          key={grandchild.menu_cd}
                        >
                          <NavLink
                            to={`/${main.design_menu_name}/${submenu.design_menu_name}/${grandchild.design_menu_name}`}
                          >
                            -- {grandchild.menu_desc}
                          </NavLink>
                        </li>
                      ))}
                  </React.Fragment>
                );
              })}
          </ul>
        );
      })}
    </div>
  );
};

export default DynamicSidebar;

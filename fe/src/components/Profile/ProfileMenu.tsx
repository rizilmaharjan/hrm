import { NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";

type TProps = {
  id?: string;
};
const ProfileMenu = ({ id }: TProps) => {
  return (
    <>
      <div className="w-full bg-gray-100 rounded-md mb-2 md:mb-4 lg:mb-6">
        <ul className="flex gap-8 p-2">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " flex items-center font-bold p-1"
                  : "flex items-center p-1"
              }
              to={`profile/${id}`}
            >
              Personal Information
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " flex items-center font-bold p-1"
                  : "flex items-center p-1"
              }
              to={`account-info/${id}`}
            >
              Account Information
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " flex items-center font-bold p-1"
                  : "flex items-center p-1"
              }
              to={`payroll-info/${id}`}
            >
              Payroll
            </NavLink>
          </li>
          {/* <li>
            <Link to="/">Family/Nominee</Link>
          </li>
          <li>
            <Link to="/">References/Skills</Link>
          </li>
          <li>
            <Link to="/">Signature</Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default ProfileMenu;

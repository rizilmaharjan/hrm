import { Outlet } from "react-router-dom";
import ProfileSummary from "../components/Profile/ProfileSummary";
import ProfileMenu from "../components/Profile/ProfileMenu";

const UserProfile = () => {
  return (
    <>
      <div className="w-full p-2 md:p-2 lg:p-4">
        <h1 className="font-bold text-sm md:text-xl lg:text:2xl mb-2">
          Employee Profile
        </h1>
        <div className="">
          <ProfileSummary />
        </div>
        <div className="mt-4">
          <ProfileMenu />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default UserProfile;

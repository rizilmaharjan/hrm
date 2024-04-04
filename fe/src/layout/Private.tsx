import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
export default function Private() {
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.user);
  const isPublicPath = location.pathname === "/";
  // const username = localStorage.getItem("username");

  if (isPublicPath && currentUser) {
    return <Navigate to="/dashboard" />;
  }

  if (!isPublicPath && !currentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Private() {
  const location = useLocation();
  const isPublicPath = location.pathname === "/";
  const username = localStorage.getItem("username");

  if (isPublicPath && username) {
    return <Navigate to="/service-events" />;
  }

  if (!isPublicPath && !username) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

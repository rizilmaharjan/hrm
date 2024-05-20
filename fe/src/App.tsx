import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Private from "./layout/Private";
import { privateRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "./redux/hooks";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      <Routes>
        {/* <Relationship /> */}

        <Route element={<Private />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<MainLayout />}>
            {currentUser?.role === "admin" ? (
              privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((childRoute) => (
                      <Route
                        key={childRoute.path}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                </Route>
              ))
            ) : (
              <>
                <Route
                  path="/attendance/apply-leave"
                  element={<Attendance />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
              </>
            )}
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

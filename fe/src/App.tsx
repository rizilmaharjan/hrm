import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Private from "./layout/Private";
import { privateRoutes, publicRoutes } from "./routes";

export default function App() {
  return (
    <>
      <Routes>
        {/* <Relationship /> */}

        <Route element={<Private />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<MainLayout />}>
            {privateRoutes.map((route) => (
              <Route path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((childRoute) => (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
              </Route>
            ))}
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service-events" element={<ServiceEvent />} />
            <Route path="/allowance" element={<Allowance />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/attendence" element={<Attendence />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/job-type" element={<JobType />} /> */}
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

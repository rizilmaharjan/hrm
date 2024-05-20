import { Router } from "express";

import * as EmployeeController from "../controllers/employeeController";
import { verifyToken } from "../middlewares/verifyToken";
import { restrictTo } from "../middlewares/restrictTo";

const router = Router();

const routes = () => {
  router.get(
    "/v1/employee",
    verifyToken,
    restrictTo("HR"),
    EmployeeController.getEmployee
  );
  router.get(
    "/v1/employee/:id",
    verifyToken,
    restrictTo("HR"),
    EmployeeController.getEmployeeById
  );
  router.put(
    "/v1/employee/:id",
    verifyToken,
    restrictTo("HR"),
    EmployeeController.editEmployeeInfo
  );

  return router;
};
export default routes;

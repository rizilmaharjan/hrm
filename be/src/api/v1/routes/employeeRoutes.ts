import { Router } from "express";

import * as EmployeeController from "../controllers/employeeController";
import { verifyToken } from "../middlewares/verifyToken";
import { restrictTo } from "../middlewares/restrictTo";

const router = Router();

const routes = () => {
  router.get("/v1/employee", verifyToken, EmployeeController.getEmployee);
  router.get(
    "/v1/employee/:id",
    verifyToken,
    EmployeeController.getEmployeeById
  );
  router.put(
    "/v1/employee/:id",
    verifyToken,
    EmployeeController.editEmployeeInfo
  );

  return router;
};
export default routes;

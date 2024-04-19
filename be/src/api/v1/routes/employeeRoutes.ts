import { Router } from "express";

import * as EmployeeController from "../controllers/employeeController";

const router = Router();

const routes = () => {
  router.get("/v1/employee", EmployeeController.getEmployee);
  router.get("/v1/employee/:id", EmployeeController.getEmployeeById);

  return router;
};
export default routes;

import { Router } from "express";

import * as PayrollController from "../controllers/payrollController";

const router = Router();

const routes = () => {
  router.get("/v1/payroll", PayrollController.getPayroll);
  return router;
};

export default routes;

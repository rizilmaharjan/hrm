import { Router } from "express";

import * as PayrollController from "../controllers/payrollController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.get("/v1/payroll", verifyToken, PayrollController.getPayroll);
  return router;
};

export default routes;

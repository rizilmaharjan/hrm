import { Router } from "express";
import * as ReportController from "../controllers/reportController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.get("/v1/fiscal-yr", verifyToken, ReportController.getFiscalYr);
  router.get("/v1/pay-month", verifyToken, ReportController.getPayMonth);
  router.get("/v1/voucher-no", verifyToken, ReportController.getVoucherNo);
  return router;
};

export default routes;

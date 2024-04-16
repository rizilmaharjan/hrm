import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import * as AccountController from "../controllers/accountController";

const router = Router();

const routes = () => {
  router.get("/v1/account", verifyToken, AccountController.getAllowance);
  return router;
};

export default routes;

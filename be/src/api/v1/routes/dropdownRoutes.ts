import { Router } from "express";

import * as DropdownController from "../controllers/dropdownController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.get("/v1/leave-type", verifyToken, DropdownController.getLeaveType);
  return router;
};

export default routes;

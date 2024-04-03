import { Router } from "express";

import * as PositionController from "./controller/index";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.post("/v1/position", verifyToken, PositionController.postPosition);
  router.get("/v1/position", verifyToken, PositionController.getPosition);
  return router;
};
export default routes;

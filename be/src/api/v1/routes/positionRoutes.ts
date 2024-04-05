import { Router } from "express";

import * as PositionController from "../controllers/positionController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.post("/v1/position", verifyToken, PositionController.postPosition);
  router.get("/v1/position", verifyToken, PositionController.getPosition);
  router.put(
    "/v1/position/:id",
    verifyToken,
    PositionController.updatePosition
  );
  router.delete(
    "/v1/position/:id",
    verifyToken,
    PositionController.deletePosition
  );

  return router;
};
export default routes;

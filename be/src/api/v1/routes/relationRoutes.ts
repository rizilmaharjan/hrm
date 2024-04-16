import { Router } from "express";
import * as RelationController from "../controllers/relationController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.post("/v1/relation", verifyToken, RelationController.postRelation);
  router.get("/v1/relation", verifyToken, RelationController.getRelation);
  router.delete(
    "/v1/relation/:id",
    verifyToken,
    RelationController.deleteRelation
  );
  router.put(
    "/v1/relation/:id",
    verifyToken,
    RelationController.updateRelation
  );
  return router;
};

export default routes;

import { Router } from "express";

import * as ReligionController from "../controllers/religionController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.post("/v1/religion", verifyToken, ReligionController.postReligion);
  router.get("/v1/religion", verifyToken, ReligionController.getReligion);
  router.delete(
    "/v1/religion/:id",
    verifyToken,
    ReligionController.deleteReligion
  );
  router.put(
    "/v1/religion/:id",
    verifyToken,
    ReligionController.updateReligion
  );
  return router;
};

export default routes;

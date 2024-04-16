import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import * as DistrictController from "../controllers/districtController";
const router = Router();

const routes = () => {
  router.post("/v1/district", verifyToken, DistrictController.postDistrict);
  router.get("/v1/district", verifyToken, DistrictController.getDistrict);
  router.delete(
    "/v1/district/:id",
    verifyToken,
    DistrictController.deleteDistrict
  );
  router.put(
    "/v1/district/:id",
    verifyToken,
    DistrictController.updateDistrict
  );
  return router;
};

export default routes;

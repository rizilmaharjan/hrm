import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  deleteAllowance,
  getAllowance,
  postAllowance,
  updateAllowance,
} from "../controllers/allowanceController";
import { validateResource } from "../middlewares/validateResource";
import { allowanceSchema } from "../validations/allowance.schema";
import { restrictTo } from "../middlewares/restrictTo";

const router = Router();

const routes = () => {
  router.post(
    "/v1/allowance",
    verifyToken,
    validateResource(allowanceSchema),
    postAllowance
  );
  router.get("/v1/allowance", verifyToken, getAllowance);
  router.delete(
    "/v1/allowance/:id",
    verifyToken,
    restrictTo("Y"),
    deleteAllowance
  );
  router.put(
    "/v1/allowance/:id",
    verifyToken,
    validateResource(allowanceSchema),
    updateAllowance
  );
  // router.get("/v1/users", getUser);
  return router;
};

export default routes;

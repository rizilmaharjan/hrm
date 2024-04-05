import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  deleteAllowance,
  getAllowance,
  postAllowance,
  updateAllowance,
} from "../controllers/allowanceController";

const router = Router();

const routes = () => {
  router.post("/v1/allowance", verifyToken, postAllowance);
  router.get("/v1/allowance", verifyToken, getAllowance);
  router.delete("/v1/allowance/:id", verifyToken, deleteAllowance);
  router.put("/v1/allowance/:id", verifyToken, updateAllowance);
  // router.get("/v1/users", getUser);
  return router;
};

export default routes;

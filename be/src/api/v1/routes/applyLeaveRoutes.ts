import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import * as leaveController from "../controllers/applyLeaveController";
import { restrictTo } from "../middlewares/restrictTo";
const router = Router();

const routes = () => {
  router.post(
    "/v1/leave",
    verifyToken,
    restrictTo("Employee"),
    // validateResource(allowanceSchema),
    leaveController.applyLeave
  );
  router.get(
    "/v1/leave",
    verifyToken,
    restrictTo("Employee"),
    leaveController.getLeave
  );
  router.delete(
    "/v1/leave/:id",
    verifyToken,
    restrictTo("Employee"),
    leaveController.deleteLeave
  );
  //   router.delete("/v1/allowance/:id", verifyToken, deleteAllowance);
  router.put(
    "/v1/leave/:id",
    verifyToken,
    restrictTo("Employee"),
    leaveController.updateLeave
  );

  router.post(
    "/v1/nep-to-eng",
    verifyToken,
    restrictTo("Employee"),
    leaveController.nepToEng
  );
  router.post(
    "/v1/eng-to-nep",
    verifyToken,
    restrictTo("Employee"),
    leaveController.engToNep
  );
  // router.get("/v1/users", getUser);
  return router;
};

export default routes;

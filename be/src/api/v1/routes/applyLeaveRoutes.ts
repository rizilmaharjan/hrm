import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import * as leaveController from "../controllers/applyLeaveController";
const router = Router();

const routes = () => {
  router.post(
    "/v1/leave",
    verifyToken,
    // validateResource(allowanceSchema),
    leaveController.applyLeave
  );
  router.get("/v1/leave", verifyToken, leaveController.getLeave);
  router.delete("/v1/leave/:id", verifyToken, leaveController.deleteLeave);
  //   router.delete("/v1/allowance/:id", verifyToken, deleteAllowance);
  router.put("/v1/leave/:id", verifyToken, leaveController.updateLeave);
  // router.get("/v1/users", getUser);
  return router;
};

export default routes;

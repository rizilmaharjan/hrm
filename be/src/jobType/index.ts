import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

import * as JobPostController from "./controller/index";
const router = Router();

const routes = () => {
  router.post("/v1/job-type", verifyToken, JobPostController.postJobType);
  router.get("/v1/job-type", verifyToken, JobPostController.getJobType);
  router.delete(
    "/v1/job-type/:id",
    verifyToken,
    JobPostController.deleteJobType
  );
  router.put("/v1/job-type/:id", verifyToken, JobPostController.updateJobType);
  return router;
};

export default routes;

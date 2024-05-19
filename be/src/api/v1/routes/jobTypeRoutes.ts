import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

import * as JobPostController from "../controllers/jobTypeController";
import { jobTypeSchema } from "../validations/jobType.schema";
import { validateResource } from "../middlewares/validateResource";
import { restrictTo } from "../middlewares/restrictTo";
const router = Router();

const routes = () => {
  router.post(
    "/v1/job-type",
    verifyToken,
    restrictTo("HR"),
    validateResource(jobTypeSchema),
    JobPostController.postJobType
  );
  router.get(
    "/v1/job-type",
    verifyToken,
    restrictTo("HR"),
    JobPostController.getJobType
  );
  router.delete(
    "/v1/job-type/:id",
    verifyToken,
    restrictTo("HR"),
    JobPostController.deleteJobType
  );
  router.put(
    "/v1/job-type/:id",
    verifyToken,
    restrictTo("HR"),
    validateResource(jobTypeSchema),
    JobPostController.updateJobType
  );
  return router;
};

export default routes;

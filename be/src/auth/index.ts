import { Router } from "express";
import { userLogin, userLogout } from "./controller";
const router = Router();

const routes = () => {
  router.post("/v1/auth/login", userLogin);
  router.get("/v1/auth/logout", userLogout);

  return router;
};

export default routes;

import { Router } from "express";
import { userLogin, userLogout } from "../controllers/authController";
const router = Router();

const routes = () => {
  router.post("/v1/auth/login", userLogin);
  router.get("/v1/auth/logout", userLogout);

  return router;
};

export default routes;

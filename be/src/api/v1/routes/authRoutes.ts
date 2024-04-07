import { Router } from "express";
import { loginSchema } from "../validations/login.schema";
import { userLogin, userLogout } from "../controllers/authController";
import { validateResource } from "../middlewares/validateResource";
const router = Router();

const routes = () => {
  router.post("/v1/auth/login", validateResource(loginSchema), userLogin);
  router.get("/v1/auth/logout", userLogout);

  return router;
};

export default routes;

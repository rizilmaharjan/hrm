import { Router } from "express";
import { loginSchema } from "../validations/login.schema";
import {
  userChangePassword,
  userLogin,
  userLogout,
} from "../controllers/authController";
import { validateResource } from "../middlewares/validateResource";
import { verifyToken } from "../middlewares/verifyToken";
import { changePasswordSchema } from "../validations/changePassword.schema";
const router = Router();

const routes = () => {
  router.post("/v1/auth/login", validateResource(loginSchema), userLogin);
  router.get("/v1/auth/logout", userLogout);
  router.post(
    "/v1/auth/changePassword",
    verifyToken,
    validateResource(changePasswordSchema),
    userChangePassword
  );

  return router;
};

export default routes;

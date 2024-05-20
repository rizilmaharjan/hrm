import { Router } from "express";
import * as MenuController from "../controllers/menuController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

const routes = () => {
  router.get("/v1/menu", MenuController.getMenu);
  return router;
};

export default routes;

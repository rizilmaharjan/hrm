import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import { env } from "./config/env";
import userRoutes from "./user/index";
import serviceRoutes from "./serviceEvent/index";
import authRoutes from "./auth/index";
import allowanceRoutes from "./allowance/index";

const app: Express = express();
const port = env.PORT;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", userRoutes());
app.use("/api", serviceRoutes());
app.use("/api", authRoutes());
app.use("/api", allowanceRoutes());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});

import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import { env } from "./config/env";
// import userRoutes from "./api/v1/routes/";
import serviceRoutes from "./api/v1/routes/serviceEventRoutes";
import authRoutes from "./api/v1/routes/authRoutes";
import allowanceRoutes from "./api/v1/routes/allowanceRoutes";
import jobTypeRoutes from "./api/v1/routes/jobTypeRoutes";
import positionRoutes from "./api/v1/routes/positionRoutes";
import accountRoutes from "./api/v1/routes/accountRoutes";
import religionRoutes from "./api/v1/routes//religionRoutes";
import relationRoutes from "./api/v1/routes/relationRoutes";
import districtRoutes from "./api/v1/routes/districtRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";

import payrollRoutes from "./api/v1/routes/payrollRoutes";
import reportRoutes from "./api/v1/routes/reportRoutes";
import menyRoutes from "./api/v1/routes/menuRoutes";
import dropdownRoutes from "./api/v1/routes/dropdownRoutes";
import applyLeaveRoutes from "./api/v1/routes/applyLeaveRoutes";
import { errorMiddleware } from "./api/v1/middlewares/error-handler";
import { appError } from "./api/v1/helpers/appError";
import { limiter } from "./api/v1/helpers/rateLimit";

const app: Express = express();
const port = env.PORT;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.use("/api", serviceRoutes());
app.use("/api", authRoutes());
app.use("/api", allowanceRoutes());
app.use("/api", jobTypeRoutes());
app.use("/api", positionRoutes());
app.use("/api", accountRoutes());
app.use("/api", religionRoutes());
app.use("/api", relationRoutes());
app.use("/api", districtRoutes());
app.use("/api", employeeRoutes());
app.use("/api", payrollRoutes());
app.use("/api", reportRoutes());
app.use("/api", menyRoutes());
app.use("/api", dropdownRoutes());
app.use("/api", applyLeaveRoutes());

// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new appError(404, `Can't find ${req.originalUrl}  on this server!`));
});

// error handling middleware
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});

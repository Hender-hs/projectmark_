import express from "express";
import dotenv from "dotenv";
import { userRoute, topicRoute, resourceRoute, userAuthRoute } from "./interface/api/route/index";
import { ExceptionHandler } from "./application/exception/handler/exception.handler";
import { Di } from "./shared/di/init.di";

dotenv.config();

// Express app
const app = express();
const port = 3000;

// JSON parser middleware
app.use(express.json());

// Authentication middleware
app.use(Di.getInstance().userAuthService.authenticationMiddleware.bind(Di.getInstance().userAuthService));

// Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", topicRoute);
app.use("/api/v1", resourceRoute);
app.use("/api/v1", userAuthRoute);

// Exception handler
app.use(ExceptionHandler.handle);

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express from "express";
import dotenv from "dotenv";
import { userRoute, topicRoute, resourceRoute } from "./interface/api/route";
import { ExceptionHandler } from "./application/exception/handler/exception.handler";

dotenv.config();

// Express app
const app = express();
const port = 3000;

// JSON parser middleware
app.use(express.json());

// Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", topicRoute);
app.use("/api/v1", resourceRoute);

// Exception handler
app.use(ExceptionHandler.handle);

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

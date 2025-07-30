import express from "express";
import dotenv from "dotenv";
import { userRoute, topicRoute } from "./interface/api/route";

dotenv.config();

// Express app
const app = express();
const port = 3000;

// JSON parser middleware
app.use(express.json());

// Routes
app.use("/", userRoute);
app.use("/", topicRoute);

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
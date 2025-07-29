import express from "express";
import dotenv from "dotenv";
import { userRoute, topicRoute } from "./interface/api/route";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/topic", topicRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
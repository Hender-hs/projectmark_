import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";

const router = Router();
const { userController } = Di.getInstance();

router.get("/", userController.getAllUsers);

export { router };
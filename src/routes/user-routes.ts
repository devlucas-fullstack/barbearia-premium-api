import { Router } from "express";
import { UserController } from "@/controllers/user-controller";

const userRoutes = Router();
const userControllers = new UserController();

userRoutes.post("/", userControllers.create);

export { userRoutes };

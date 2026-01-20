import { Router } from "express";
import { SessionController } from "@/controllers/session-controller";

const sessionRoutes = Router();
const sessionControllers = new SessionController();

sessionRoutes.post("/", sessionControllers.create);

export { sessionRoutes };

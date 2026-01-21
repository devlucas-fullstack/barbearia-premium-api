import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";
import { appointmentRoutes } from "./appointment-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);

routes.use(ensureAuthenticated);
routes.use("/appointments", appointmentRoutes);

export { routes };

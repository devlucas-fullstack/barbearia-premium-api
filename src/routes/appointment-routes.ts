import { Router } from "express";
import { AppointmentController } from "@/controllers/appointment-controller";

const appointmentRoutes = Router();
const appointmentControllers = new AppointmentController();

appointmentRoutes.post("/", appointmentControllers.create);

export { appointmentRoutes };

import { Router } from "express";
import { AppointmentController } from "@/controllers/appointment-controller";
import { allowRoles } from "@/middlewares/allow-roles";

const appointmentRoutes = Router();
const appointmentControllers = new AppointmentController();

appointmentRoutes.post(
  "/",
  allowRoles("CLIENT"),
  appointmentControllers.create,
);
appointmentRoutes.get("/", appointmentControllers.index);
appointmentRoutes.patch(
  "/:id/confirm",
  allowRoles("BARBER", "ADMIN"),
  appointmentControllers.confirm,
);
appointmentRoutes.patch(
  "/:id/canceled",
  allowRoles("BARBER", "ADMIN", "CLIENT"),
  appointmentControllers.canceled,
);
appointmentRoutes.get(
  "/dashboard",
  allowRoles("BARBER", "ADMIN"),
  appointmentControllers.dashboard,
);

export { appointmentRoutes };

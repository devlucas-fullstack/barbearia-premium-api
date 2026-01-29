import { Appointment } from "@prisma/client";
import {
  AppointmentStatusPT,
  CategoriesCourtPT,
} from "@/utils/appointment-translation";

type AppointmentWithRelations = Appointment & {
  barber: {
    id: string;
    name: string;
  } | null;
  client: {
    id: string;
    name: string;
  } | null;
};

export function appointmentToPT(appointment: AppointmentWithRelations) {
  return {
    id: appointment.id,
    data: appointment.date,
    status: AppointmentStatusPT[appointment.status],
    servico: CategoriesCourtPT[appointment.category],
    criado_em: appointment.createdAt,
    barbeiro: appointment.barber
      ? {
          id: appointment.barber.id,
          nome: appointment.barber.name,
        }
      : null,

    cliente: appointment.client
      ? {
          id: appointment.client.id,
          nome: appointment.client.name,
        }
      : null,
  };
}

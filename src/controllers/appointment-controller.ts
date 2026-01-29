import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { convertToUTC } from "@/utils/convertToUTC";
import { z } from "zod";
import { appointmentToPT } from "@/mappers/appointment-mapper";

class AppointmentController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      date: z.string().min(1, "Informe uma data válida"),
      category: z.enum(["CUT", "BEARD", "CUT_BEARD", "CUT_BEARD_EYEBROW"]),
      barberId: z.string().uuid({ message: "Informe um barbeiro válido!" }),
    });

    const { date, category, barberId } = bodySchema.parse(req.body);

    const appointmentDate = convertToUTC(date);

    if (!req.user.id) {
      throw new AppError("Não autorizado!", 401);
    }

    if (appointmentDate < new Date()) {
      throw new AppError("Não é possível agendar para uma data passada!");
    }

    const barber = await prisma.user.findFirst({
      where: { id: barberId, role: "BARBER" },
    });

    if (!barber) {
      throw new AppError("Selecione um barbeiro válido!", 404);
    }

    const conflict = await prisma.appointment.findFirst({
      where: {
        barberId,
        date: appointmentDate,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    });

    if (conflict) {
      throw new AppError("Horário indisponível", 409);
    }

    await prisma.appointment.create({
      data: {
        date: appointmentDate,
        category,
        barberId,
        clientId: req.user.id,
        status: "PENDING",
      },
    });

    return res.status(201).json();
  }

  async index(req: Request, res: Response) {
    if (!req.user.id) {
      throw new AppError("Não autorizado!", 401);
    }

    const { role, id: userId } = req.user;

    const where: any = {};

    if (role === "CLIENT") {
      where.clientId = userId;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        date: "asc",
      },
      include: {
        barber: {
          select: {
            id: true,
            name: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.json(appointments.map(appointmentToPT));
  }

  async confirm(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { role, id: userId } = req.user;

    if (role !== "BARBER" && role !== "ADMIN") {
      throw new AppError("Apenas barbeiros podem confirmar agendamento!", 403);
    }

    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) {
      throw new AppError("Esse agendamento não existe!", 404);
    }

    if (appointment.status !== "PENDING") {
      throw new AppError(
        "Somente agendamentos pendentes podem ser confirmados!",
      );
    }

    if (role === "BARBER" && appointment.barberId !== userId) {
      throw new AppError("Você não pode confirma esse agendamento!", 403);
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });

    return res.json();
  }

  async canceled(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { role, id: userId } = req.user;

    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) {
      throw new AppError("Esse agendamento não existe!", 404);
    }

    if (appointment.status === "COMPLETED") {
      throw new AppError("Agendamentos concluídos não podem ser cancelados!");
    }

    if (role === "CLIENT" && appointment.clientId !== userId) {
      throw new AppError("Você não pode cancelar esse agendamento!", 403);
    }

    if (role === "BARBER" && appointment.barberId !== userId) {
      throw new AppError("Você não pode cancelar esse agendamento!", 403);
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: "CANCELED" },
    });

    return res.json();
  }
}

export { AppointmentController };

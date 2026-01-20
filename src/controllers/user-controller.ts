import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(3, { message: "Informe um nome válido!" }),
      email: z.string().email({ message: "Informe um email válido!" }),
      password: z
        .string()
        .min(6, { message: "Informe uma senha com no mínimo 6 dígitos!" }),
      role: z.enum(["CLIENT", "ADMIN", "BARBER"]).default("CLIENT"),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const hashedPassword = await hash(password, 8);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("Endereço de email já existe!");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json();
  }
}

export { UserController };

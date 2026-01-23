import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";
import { jwtConfig } from "@/configs/jwt";
import { sign } from "jsonwebtoken";

class SessionController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Email e/ou senha inválidos!", 401);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError("Email e/ou senha inválidos!", 401);
    }

    const { secret, expiresIn } = jwtConfig;
    const token = sign({ role: user.role }, secret, {
      expiresIn,
      subject: String(user.id),
    });

    return res.status(201).json({ user, token });
  }
}

export { SessionController };

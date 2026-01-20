import { jwtConfig } from "@/configs/jwt";
import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  sub: string;
  role: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, jwtConfig.secret) as JwtPayload;

    request.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    throw new AppError("Token inválido ou expirado!", 401);
  }
}

export { ensureAuthenticated };

import { Request, Response } from "express";

class AppointmentController {
  async create(req: Request, res: Response) {
    res.json("teste");
  }
}

export { AppointmentController };

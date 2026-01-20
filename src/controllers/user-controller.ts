import { Request, Response } from "express";

class UserController {
  async create(req: Request, res: Response) {
    res.json("teste");
  }
}

export { UserController };

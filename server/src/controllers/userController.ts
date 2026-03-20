import type { Request, Response } from "express";
import userService from "../services/userService.js";
import { AppError } from "../errors/AppError.js";
import type { CreateUserDTO, UpdateUserDTO } from "../DTOs/userDTO.js";

class UserController {
  async create(req: Request, res: Response) {
    const data: CreateUserDTO = req.body;
    const user = await userService.create(data);
    console.log("Usuário criado com sucesso");
    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data: UpdateUserDTO = req.body;
    const user = await userService.update(data, id as string);
    return res.status(200).json(user);
  }

  async findByEmail(req: Request, res: Response) {
    const { email } = req.body;
    const user = await userService.findByEmail(email);
    return res.status(200).json(user);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findById(id as string);
    return res.status(200).json(user);
  }

  async findUserTickets(req: Request, res: Response) {
    const { id } = req.params;
    const userAndTickets = await userService.findUserTickets(id as string);
    return res.status(200).json(userAndTickets);
  }
}

export default new UserController();

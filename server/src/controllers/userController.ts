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

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.delete(id as string);
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

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    req.session.userId = user.id;
    return res
      .status(200)
      .json({ message: "Log-in realizado com sucesso!", user });
  }

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Erro ao sair." });

      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Deslogado com sucesso!" });
    });
  }

  async findMe(req: Request, res: Response) {
    const { userId } = req.session;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const user = await userService.findById(userId);
    return res.status(200).json(user);
  }
}

export default new UserController();

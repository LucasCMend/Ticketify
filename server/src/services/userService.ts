import bcrypt from "bcrypt";
import type { CreateUserDTO, UpdateUserDTO } from "../DTOs/userDTO.js";
import { AppError } from "../errors/AppError.js";
import userRepository from "../repositories/userRepository.js";

class UserService {
  async create(data: CreateUserDTO) {
    const userExists = await userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async update(data: UpdateUserDTO, id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (data.email) {
      if (data.email === user.email) {
        throw new AppError("Este já é o seu e-mail atual.", 400);
      }

      const emailExists = await userRepository.findByEmail(data.email);
      if (emailExists) {
        throw new AppError(
          "Este e-mail já está sendo usado por outra conta.",
          409,
        );
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await userRepository.update(data, id);
    return updatedUser;
  }

  async delete(id: string) {
    const userExists = await this.findById(id);

    const deletedUser = await userRepository.delete(id);
    return deletedUser;
  }

  async findByEmail(email: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }
    return user;
  }

  async findById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }
    return user;
  }

  async findUserTickets(id: string) {
    const user = await this.findById(id);

    const userAndTickets = await userRepository.findUserTickets(id);
    return userAndTickets;
  }
}

export default new UserService();

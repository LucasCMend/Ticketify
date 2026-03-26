import { Prisma } from "@prisma/client";
import { prisma } from "../database/index.js";
import type { CreateUserDTO, UpdateUserDTO } from "../DTOs/userDTO.js";

const userSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
};

class UserRepository {
  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data,
      select: userSelect,
    });
    return user;
  }

  async update(data: UpdateUserDTO, id: string) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
    return updatedUser;
  }

  async delete(id: string) {
    const user = await prisma.user.delete({
      where: { id },
      select: userSelect,
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    return user;
  }

  async findUserTickets(id: string) {
    const userAndTickets = await prisma.user.findUnique({
      where: { id },
      select: { ...userSelect, tickets: true },
    });
    return userAndTickets;
  }
}

export default new UserRepository();

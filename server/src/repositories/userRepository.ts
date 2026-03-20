import { prisma } from "../database/index.js";
import type { CreateUserDTO, UpdateUserDTO } from "../DTOs/userDTO.js";

class UserRepository {
  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({ data });
    return user;
  }

  async update(data: UpdateUserDTO, id: string) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findUserTickets(id: string) {
    const userAndTickets = await prisma.user.findUnique({
      where: { id },
      include: { tickets: true },
    });
    return userAndTickets;
  }
}

export default new UserRepository();

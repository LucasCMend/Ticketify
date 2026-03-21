import { prisma } from "../database/index.js";
import { Prisma } from "@prisma/client";

class EventRepository {
  async create(data: Prisma.EventCreateInput) {
    return await prisma.event.create({ data });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return await prisma.event.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.event.delete({ where: { id } });
  }

  async findById(id: string) {
    return await prisma.event.findUnique({ where: { id } });
  }

  async findMany() {
    return await prisma.event.findMany();
  }
}

export default new EventRepository();

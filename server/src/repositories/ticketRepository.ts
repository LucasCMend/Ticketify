import type { CreateTicketDTO } from "../DTOs/ticketDTO.js";
import { prisma } from "../database/index.js";

class TicketRepository {
  async create(data: CreateTicketDTO) {
    const ticket = await prisma.ticket.create({ data });
    return ticket;
  }

  async findById(id: string) {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    return ticket;
  }

  async findByUserId(id: string) {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    return ticket;
  }
}

export default new TicketRepository();

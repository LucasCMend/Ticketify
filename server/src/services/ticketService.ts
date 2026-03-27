import { AppError } from "../errors/AppError.js";
import type { CreateTicketDTO } from "../DTOs/ticketDTO.js";
import ticketRepository from "../repositories/ticketRepository.js";
import eventRepository from "../repositories/eventRepository.js";
import userRepository from "../repositories/userRepository.js";
import type { UpdateEventDTO } from "../DTOs/eventDTO.js";

class TicketService {
  async create(data: CreateTicketDTO) {
    const userExists = await userRepository.findById(data.userId);
    const eventExists = await eventRepository.findById(data.eventId);

    if (!userExists || !eventExists) {
      throw new AppError("Usuário ou evento não encontrado.", 404);
    }
    return await ticketRepository.create(data);
  }

  async findById(id: string) {
    const ticket = await ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError("O ticket não existe", 404);
    }
    return ticket;
  }
}

export default new TicketService();

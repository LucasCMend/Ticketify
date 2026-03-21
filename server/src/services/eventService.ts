import type { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import eventRepository from "../repositories/eventRepository.js";
import type { CreateEventDTO, UpdateEventDTO } from "../DTOs/eventDTO.js";

class EventService {
  async create(data: CreateEventDTO) {
    const eventDate = new Date(data.date);

    if (eventDate < new Date()) {
      throw new AppError(
        "A data do evento não deve ser anterior à data atual.",
        400,
      );
    }

    const eventData = { ...data, availableTickets: data.totalTickets };
    return await eventRepository.create(eventData);
  }

  async update(id: string, data: UpdateEventDTO) {
    const event = await this.findById(id);
    const updateData: Prisma.EventUpdateInput = { ...data };

    if (!event) {
      throw new AppError("Evento não encontrado.", 404);
    }

    if (data.date) {
      const eventDate = new Date(data.date as string | Date);
      if (eventDate < new Date()) {
        throw new AppError(
          "A data do evento não deve ser anterior à data atual.",
          400,
        );
      }
    }
    if (data.totalTickets !== undefined) {
      const newTotalTickets = Number(data.totalTickets);
      const soldTickets = event.totalTickets - event.availableTickets;

      if (newTotalTickets < soldTickets) {
        throw new AppError(
          `Não é possível reduzir a capacidade para ${newTotalTickets}. Já existem ${soldTickets} ingressos vendidos.`,
          400,
        );
      }
      if (newTotalTickets <= 0) {
        throw new AppError(
          `Não é possível reduzir a capacidade para um número menor que 0.`,
          400,
        );
      }
      const newAvailableTickets =
        event.availableTickets + (newTotalTickets - event.totalTickets);
      updateData.availableTickets = newAvailableTickets;
      updateData.totalTickets = newTotalTickets;
    }
    return await eventRepository.update(id, updateData);
  }

  async delete(id: string) {
    const event = await eventRepository.findById(id);

    if (!event) {
      throw new AppError("Evento não encontrado.", 404);
    }
    const soldTickets = event.totalTickets - event.availableTickets;

    if (soldTickets > 0) {
        throw new AppError(
          `Não é possível deletar o evento. Já existem ${soldTickets} ingressos vendidos.`,
          400,
        );
    }
    return await eventRepository.delete(id);
  }

  async findById(id: string) {
    const event = await eventRepository.findById(id);

    if (!event) {
      throw new AppError("Evento não encontrado.", 404);
    }
    return event;
  }

  async findMany(onlyUpcoming: boolean) {
    const events = await eventRepository.findMany()
    const today = new Date()

    if (onlyUpcoming) {
        return events.filter(event => new Date(event.date) > today)
    }
    return events.filter(event => new Date(event.date) < today)
  }
}

export default new EventService();

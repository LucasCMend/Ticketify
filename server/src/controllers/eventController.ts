import type { Request, Response } from "express";
import eventService from "../services/eventService.js";
import { createEventDTO, updateEventDTO } from "../DTOs/eventDTO.js";

class EventController {
  async create(req: Request, res: Response) {
    const data = createEventDTO.parse(req.body);
    const event = await eventService.create(data);
    return res.status(201).json(event);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = updateEventDTO.parse(req.body);
    const event = await eventService.update(id as string, data);
    return res.status(200).json(event);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const event = await eventService.delete(id as string);
    return res.status(200).json(event)
  }
  async findById(req: Request, res:Response) {
    const { id } = req.params;
    const event = await eventService.findById(id as string);
    return res.status(200).json(event);
  }

  async findMany(req: Request, res: Response) {
    const { onlyUpcoming } = req.query;
    const events = await eventService.findMany(onlyUpcoming === "true");
    return res.status(200).json(events);
  }
}

export default new EventController();

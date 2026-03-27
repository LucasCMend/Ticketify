import type { Request, Response } from "express";
import ticketService from "../services/ticketService.js";
import type { CreateTicketDTO } from "../DTOs/ticketDTO.js";

class TicketController {
    async create(req:Request, res:Response) {
        const data: CreateTicketDTO = req.body
        const ticket = await ticketService.create(data)
        return res.status(201).json(ticket)
    }
    async findById(req:Request<{ id: string }>, res:Response) {
        const {id} = req.params
        const ticket = await ticketService.findById(id)
        return res.status(200).json(ticket)
    }
    async findUserTickets(req:Request<{ id: string }>, res:Response) {
        const { id: userId } = req.params;
        const tickets = await ticketService.findUserTickets(userId)
        return res.status(200).json(tickets)
    }
}

export default new TicketController();

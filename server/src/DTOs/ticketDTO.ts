import { z } from "zod";

const createTicketDTO = z.object({
  userId: z.string().uuid({ message: "O userId deve ser um UUID válido." }),
  eventId: z.string().uuid({ message: "O eventId deve ser um UUID válido." }),
});

export type CreateTicketDTO = z.infer<typeof createTicketDTO>

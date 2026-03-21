import { z } from "zod";

const createEventDTO = z.object({
  name: z.string().min(1, { message: "O nome do evento é obrigatório." }),
  description: z
    .string()
    .min(1, { message: "A descrição do evento é obrigatória." }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "A data deve ser uma string de data válida.",
  }),
  totalTickets: z
    .number()
    .int()
    .positive({
      message: "O total de ingressos deve ser um número inteiro positivo.",
    }),
});

export type CreateEventDTO = z.infer<typeof createEventDTO>;

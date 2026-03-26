import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
});

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().toLowerCase().optional(),
  password: z.string().min(6).optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid("O ID fornecido não é um UUID válido."),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

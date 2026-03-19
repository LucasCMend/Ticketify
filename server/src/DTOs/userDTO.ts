import {z} from 'zod';

const createUserSchema = {
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Formato de e-mail inválido")
}

export type CreateUserDTO = z.infer<typeof createUserSchema>;
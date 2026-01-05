import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'O e-mail é obrigatório' })
    .email('Formato de e-mail inválido'),
  
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'O e-mail é obrigatório' })
    .email('Formato de e-mail inválido'),
    
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(1, 'A senha não pode estar vazia')
});

export type LoginInput = z.infer<typeof loginSchema>;
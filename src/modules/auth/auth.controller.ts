import type { Request, Response } from 'express';
import { HttpError } from '../../middlewares/errorHandler';
import { register, login } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';

export async function registerHandler(req: Request, res: Response) {
  const { email, password } = registerSchema.parse(req.body);

  await register({ email, password });

  return res.status(201).json({ message: 'Usuário criado com sucesso' });
}

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const token = await login({ email, password });
  if (!token) throw new HttpError(401, 'Credenciais Inválidas');

  return res.json({ token });
}

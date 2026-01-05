import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { HttpError } from '../../middlewares/errorHandler';
import { UserModel } from '../user/user.model'; 
import { LoginInput, RegisterInput } from './auth.schema';

function signToken(payload: { sub: string; email: string }) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
} 

export async function register({ email, password}: RegisterInput) {
  const existingUser = await UserModel.findOne({ email }).lean();
  if (existingUser) throw new HttpError(409, 'Email já está em uso');

  const passwordHash = await bcrypt.hash(password, 10);
  await UserModel.create({ email, password: passwordHash });
}

export async function login({ email, password }: LoginInput) {
  const user = await UserModel.findOne({ email }).lean();
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
 
  return signToken({ sub: String(user._id), email: user.email });
}
import 'dotenv/config';
import type { SignOptions } from 'jsonwebtoken';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  MONGO_URI: requireEnv('MONGO_URI'),
  JWT_SECRET: requireEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn']
};

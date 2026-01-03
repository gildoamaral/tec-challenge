import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB Conectado');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}
import 'express-async-errors';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from './modules/auth/auth.routes'; 
import { orderRouter } from './modules/orders/order.routes'; 
import { swaggerSpec } from './config/swagger';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/auth", authRouter);
  app.use("/orders", orderRouter);

  app.use(errorHandler);

  return app;
}

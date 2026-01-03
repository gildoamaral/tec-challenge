import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from './routes/auth.route';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use("/auth", authRouter);

  app.use(errorHandler);

  return app;
}

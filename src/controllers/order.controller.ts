import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { createOrderSchema, listOrdersSchema, orderParamsSchema } from '../schemas/order.schema';
import { createOrder, listOrders, advanceOrderState } from '../services/order.service';
import { HttpError } from '../middlewares/errorHandler';

export async function createOrderHandler(req: AuthRequest, res: Response) {
  const data = createOrderSchema.parse(req.body);
  
  const order = await createOrder(data);

  return res.status(201).json(order);
}

export async function listOrdersHandler(req: AuthRequest, res: Response) {
  const params = listOrdersSchema.parse(req.query);
  
  const result = await listOrders(params);

  return res.json(result);
}
 
export async function advanceOrderHandler(req: AuthRequest, res: Response) {
  const { id } = orderParamsSchema.parse(req.params);

  const order = await advanceOrderState(id);
 
  return res.json(order);
}

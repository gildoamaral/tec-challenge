import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { 
  createOrderHandler, 
  listOrdersHandler,
  advanceOrderHandler 
} from './order.controller';

export const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.post('/', createOrderHandler);
orderRouter.get('/', listOrdersHandler);
orderRouter.patch('/:id/advance', advanceOrderHandler);
 
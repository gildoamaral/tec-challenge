import {
  OrderDocument,
  OrderModel,
  OrderState,
  OrderStatus,
} from "../models/Order";
import { HttpError } from "../middlewares/errorHandler";
import { CreateOrderInput, ListOrdersInput } from "../schemas/order.schema";
import { FilterQuery } from "mongoose";

const STATE_TRANSITIONS: Record<OrderState, OrderState | null> = {
  [OrderState.CREATED]: OrderState.ANALYSIS,
  [OrderState.ANALYSIS]: OrderState.COMPLETED,
  [OrderState.COMPLETED]: null,
};

export async function createOrder(data: CreateOrderInput) {
  const order = await OrderModel.create({
    ...data,
    state: OrderState.CREATED,
    status: OrderStatus.ACTIVE,
  });

  return order;
}

export async function listOrders({ page, limit, state }: ListOrdersInput) {
  const skip = (page - 1) * limit;

  const filter: FilterQuery<OrderDocument> = { status: OrderStatus.ACTIVE };
  if (state) filter.state = state;

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    OrderModel.countDocuments(filter),
  ]);

  return {
    data: orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function advanceOrderState(orderId: string) {
  const order = await OrderModel.findById(orderId);

  if (!order) throw new HttpError(404, "Pedido não encontrado");

  if (order.status === OrderStatus.DELETED)
    throw new HttpError(400, "Não é possível avançar um pedido deletado");

  const nextState = STATE_TRANSITIONS[order.state];

  if (!nextState) {
    throw new HttpError(400, "Pedido já está no estado final (COMPLETED)");
  }

  order.state = nextState;
  await order.save();

  return order;
}

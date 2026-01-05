import { Schema, model } from 'mongoose';
import {
  OrderState,
  OrderStatus,
  ServiceStatus,
  OrderService,
  OrderDocument
} from './order.types';

const orderServiceSchema = new Schema<OrderService>(
  {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: Object.values(ServiceStatus),
      default: ServiceStatus.PENDING
    }
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDocument>(
  {
    lab: {
      type: String,
      required: true
    },
    patient: {
      type: String,
      required: true
    },
    customer: {
      type: String,
      required: true
    },
    state: {
      type: String,
      enum: Object.values(OrderState),
      default: OrderState.CREATED
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.ACTIVE
    },
    services: {
      type: [orderServiceSchema],
      required: true
    }
  },
  { timestamps: true }
);

orderSchema.index({ status: 1, createdAt: -1 }); 
orderSchema.index({ state: 1 });

export const OrderModel = model<OrderDocument>('Order', orderSchema);

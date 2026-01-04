import { Schema, model } from 'mongoose';

export enum OrderState {
  CREATED = 'CREATED',
  ANALYSIS = 'ANALYSIS',
  COMPLETED = 'COMPLETED'
}

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

export enum ServiceStatus {
  PENDING = 'PENDING',
  DONE = 'DONE'
}

export type OrderService = {
  name: string;
  value: number;
  status: ServiceStatus;
};

export type OrderDocument = {
  lab: string;
  patient: string;
  customer: string;
  state: OrderState;
  status: OrderStatus;
  services: OrderService[];
  createdAt?: Date;
  updatedAt?: Date;
};

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
      required: true,
      validate: {
        validator: function(v: OrderService[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Pedido deve ter ao menos um serviço'
      }
    }
  },
  { timestamps: true }
);

orderSchema.index({ status: 1, createdAt: -1 }); 
orderSchema.index({ state: 1 });

export const OrderModel = model<OrderDocument>('Order', orderSchema);

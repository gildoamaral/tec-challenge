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

export interface OrderService {
  name: string;
  value: number;
  status: ServiceStatus;
}

export interface OrderDocument {
  lab: string;
  patient: string;
  customer: string;
  state: OrderState;
  status: OrderStatus;
  services: OrderService[];
  createdAt?: Date;
  updatedAt?: Date;
}

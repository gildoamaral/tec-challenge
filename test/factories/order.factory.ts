import { vi } from 'vitest';
import { OrderState, OrderStatus, ServiceStatus } from '../../src/models/Order';

export const makeMockOrder = (overrides = {}) => ({
  _id: '1234567891011121314',
  lab: 'Lab Test',
  patient: 'Lucas Lima',
  customer: 'Cliente 1',
  state: OrderState.CREATED,
  status: OrderStatus.ACTIVE,
  services: [{ name: 'Service 1', value: 100, status: ServiceStatus.PENDING }],
  save: vi.fn().mockResolvedValue(true), 
  ...overrides,
});
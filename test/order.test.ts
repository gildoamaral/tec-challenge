import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderModel, OrderState, OrderStatus, ServiceStatus } from '../src/models/Order';
import { advanceOrderState } from '../src/services/order.service';
import { makeMockOrder } from './factories/order.factory';

vi.mock('../src/models/Order', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/models/Order')>();
  return {
    ...actual,
    OrderModel: {
      findById: vi.fn(),
    },
  };
});

describe('Order Service: advanceOrderState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve avançar de CREATED para ANALYSIS', async () => {
    const mockOrder = makeMockOrder({ state: OrderState.CREATED });
    vi.mocked(OrderModel.findById).mockResolvedValue(mockOrder as any);

    const updated = await advanceOrderState(mockOrder._id);

    expect(OrderModel.findById).toHaveBeenCalledWith(mockOrder._id);
    expect(mockOrder.save).toHaveBeenCalled();
    expect(updated.state).toBe(OrderState.ANALYSIS);
  });

  it('deve avançar de ANALYSIS para COMPLETED', async () => {
    const mockOrder = makeMockOrder({ state: OrderState.ANALYSIS });
    vi.mocked(OrderModel.findById).mockResolvedValue(mockOrder as any);

    const updated = await advanceOrderState(mockOrder._id);

    expect(updated.state).toBe(OrderState.COMPLETED);
  });

  it('deve bloquear avanço se já estiver COMPLETED', async () => {
    const mockOrder = makeMockOrder({ state: OrderState.COMPLETED });
    vi.mocked(OrderModel.findById).mockResolvedValue(mockOrder as any);

    await expect(advanceOrderState(mockOrder._id))
      .rejects.toMatchObject({ 
      statusCode: 400,
      message: expect.stringMatching(/estado final/i) 
    });
  });

  it('deve bloquear avanço de pedido DELETED', async () => {
    const mockOrder = makeMockOrder({ 
      state: OrderState.CREATED, 
      status: OrderStatus.DELETED 
    });
    vi.mocked(OrderModel.findById).mockResolvedValue(mockOrder as any);

    await expect(advanceOrderState(mockOrder._id))
      .rejects.toMatchObject({ 
      statusCode: 400,
      message: expect.stringMatching(/pedido deletado/i) 
    });
  });

  it('deve lançar erro se o pedido não for encontrado', async () => {
    vi.mocked(OrderModel.findById).mockResolvedValue(null);

    await expect(advanceOrderState('id_inexistente'))
      .rejects.toMatchObject({ 
      statusCode: 404,
      message: expect.stringMatching(/não encontrado/i) 
    });
  });

  it('deve garantir o fluxo sequencial completo (CREATED -> ANALYSIS -> COMPLETED)', async () => {
    const mockOrder = makeMockOrder({ state: OrderState.CREATED });
    vi.mocked(OrderModel.findById).mockResolvedValue(mockOrder as any);

    let result = await advanceOrderState(mockOrder._id);
    expect(result.state).toBe(OrderState.ANALYSIS);

    result = await advanceOrderState(mockOrder._id);
    expect(result.state).toBe(OrderState.COMPLETED);

    await expect(advanceOrderState(mockOrder._id))
      .rejects.toMatchObject({ 
      statusCode: 400,
      message: expect.stringMatching(/estado final/i) 
    });
  });
});
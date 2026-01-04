import { z } from "zod";
import { OrderState, ServiceStatus } from "../models/Order";
import { isValidObjectId } from "mongoose";

export const serviceSchema = z.object({
  name: z.string().min(1, "Nome do serviço é obrigatório"),
  value: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  status: z.nativeEnum(ServiceStatus).optional().default(ServiceStatus.PENDING),
});

export const createOrderSchema = z
  .object({
    lab: z.string().min(1, "Lab é obrigatório"),
    patient: z.string().min(1, "Patient é obrigatório"),
    customer: z.string().min(1, "Customer é obrigatório"),
    services: z
      .array(serviceSchema)
      .min(1, "Pedido deve ter ao menos um serviço"),
  })
  .refine(
    (data) => {
      const totalValue = data.services.reduce(
        (sum, service) => sum + service.value,
        0
      );
      return totalValue > 0;
    },
    {
      message: "Valor total do pedido não pode ser zero",
    }
  );
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const listOrdersSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  state: z.nativeEnum(OrderState).optional(),
});
export type ListOrdersInput = z.infer<typeof listOrdersSchema>;

export const orderParamsSchema = z.object({
  id: z.string().refine((val) => isValidObjectId(val), {
    message: "ID do pedido inválido",
  }),
});

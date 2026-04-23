import { Order } from '../../../generated/prisma/client';
import { CreateOrderDto } from '../dto/create-order.dto';

export function mapOrderDTO(order: Order): CreateOrderDto {
  return {
    name: order.name,
    size: order.size ?? undefined,
    costumer: order.costumer,
  };
}

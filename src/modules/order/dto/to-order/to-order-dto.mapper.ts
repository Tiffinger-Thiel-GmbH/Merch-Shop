import { Order, OrderItem } from '../../../../generated/prisma/client';
import { OrderDTO } from '../order/order.dto';
import { toOrderItemDTO } from './to-order-item-dto.mapper';

export function toOrderDTO(value: { order: Order; orderItems: OrderItem[] }): OrderDTO {
  return {
    id: value.order.id,
    items: value.orderItems.map(toOrderItemDTO),
    userId: value.order.userId,
  };
}

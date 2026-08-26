import { Order, OrderItem, OrderItemVariant } from '../../../../generated/prisma/client';
import { OrderDTO } from '../order/order.dto';
import { toOrderItemDTO } from './to-order-item-dto.mapper';

type OrderItemWithVariants = OrderItem & {
  orderItemVariant: OrderItemVariant[];
};

export function toOrderDTO(value: { order: Order; orderItems: OrderItemWithVariants[] }): OrderDTO {
  return {
    id: value.order.id,
    items: value.orderItems.map(toOrderItemDTO),
    userId: value.order.userId,
  };
}

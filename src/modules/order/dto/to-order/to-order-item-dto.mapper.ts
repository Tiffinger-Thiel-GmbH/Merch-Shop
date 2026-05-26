import { OrderItem } from '../../../../generated/prisma/client';
import { OrderItemDTO } from '../order/order-item.dto';

export function toOrderItemDTO(orderItem: OrderItem): OrderItemDTO {
  return {
    id: orderItem.id,
    orderId: orderItem.orderId,
    productId: orderItem.productId,
    name: orderItem.name,
    quantity: orderItem.quantity,
  };
}

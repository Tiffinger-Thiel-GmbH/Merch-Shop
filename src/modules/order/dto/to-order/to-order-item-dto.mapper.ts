import { OrderItem, OrderItemVariant } from '../../../../generated/prisma/client';
import { OrderItemDTO } from '../order/order-item.dto';

type OrderItemWithVariants = OrderItem & {
  orderItemVariant: OrderItemVariant[];
};

export function toOrderItemDTO(orderItem: OrderItemWithVariants): OrderItemDTO {
  return {
    id: orderItem.id,
    orderId: orderItem.orderId,
    productId: orderItem.productId,
    name: orderItem.name,
    quantity: orderItem.quantity,
    productVariants: orderItem.orderItemVariant.map(variant => ({
      id: variant.id,
      productVariantId: variant.productVariantId,
      category: variant.category,
      name: variant.name,
      description: variant.description,
    })),
  };
}

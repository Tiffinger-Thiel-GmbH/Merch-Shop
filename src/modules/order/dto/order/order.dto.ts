import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderItemDTO } from '../create-order/create-order-item.dto';
import { OrderItemDTO } from './order-item.dto';

export class OrderDTO {
  @IsUUID()
  id!: string;

  @IsUUID()
  userId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items!: OrderItemDTO[];
}

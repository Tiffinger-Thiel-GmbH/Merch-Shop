import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { OrderItemVariantDTO } from './order-item-variant.dto';

export class OrderItemDTO {
  @IsUUID()
  id!: string;

  @IsUUID()
  orderId!: string;

  @IsUUID()
  productId!: string;

  @IsString()
  name!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemVariantDTO)
  productVariants!: OrderItemVariantDTO[];
}

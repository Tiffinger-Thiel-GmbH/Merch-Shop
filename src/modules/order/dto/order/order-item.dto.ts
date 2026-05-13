import { IsUUID, IsNumber, Min, IsOptional } from 'class-validator';

export class OrderItemDTO {
  @IsUUID()
  id!: string;

  @IsUUID()
  orderId!: string;

  @IsUUID()
  productId!: string;

  name!: string;

  @IsOptional()
  size?: string;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

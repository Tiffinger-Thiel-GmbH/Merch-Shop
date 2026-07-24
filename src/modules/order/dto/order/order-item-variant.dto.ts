import { IsString, IsUUID } from 'class-validator';

export class OrderItemVariantDTO {
  @IsUUID()
  id!: string;

  @IsUUID()
  productVariantId!: string;

  @IsString()
  category!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;
}

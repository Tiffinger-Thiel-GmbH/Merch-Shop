import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductVariantOutgoingDTO {
  @IsString()
  category!: string;
  @IsString()
  name!: string;
  @IsUUID()
  @IsNotEmpty()
  productVariantId!: string;
}

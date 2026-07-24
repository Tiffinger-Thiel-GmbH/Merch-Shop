import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductVariantOutgoingDTO {
  @IsString()
  category!: string | undefined;
  @IsString()
  name!: string;
  @IsUUID()
  @IsNotEmpty()
  productVariantId!: string;
}

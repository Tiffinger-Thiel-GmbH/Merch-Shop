import { IsOptional, IsString } from 'class-validator';

export class ProductVariantIncomingDTO {
  @IsOptional()
  @IsString()
  category?: string;
}

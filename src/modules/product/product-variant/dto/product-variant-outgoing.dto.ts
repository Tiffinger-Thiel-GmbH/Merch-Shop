import { IsString } from 'class-validator';

export class ProductVariantOutgoingDTO {
  @IsString()
  category!: string | undefined;
  @IsString()
  name!: string;
}

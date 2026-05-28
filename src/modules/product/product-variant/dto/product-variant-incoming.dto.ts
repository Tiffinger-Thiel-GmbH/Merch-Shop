import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ProductVariantIncomingDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '22222222-2222-4222-8222-222222222222',
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsOptional()
  @IsString()
  category?: string;
}

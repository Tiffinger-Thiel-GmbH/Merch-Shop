import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductIdDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '22222222-2222-4222-8222-222222222222',
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;
}

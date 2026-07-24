import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '11111111-1111-4111-8111-111111111111',
  })
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['10000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002'],
  })
  productVariantId!: string[];
}

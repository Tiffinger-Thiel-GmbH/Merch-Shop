import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsNotEmpty, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { CreateOrderItemDTO } from './create-order-item.dto';

export class CreateOrderDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '9aaca58e-4ea2-4008-bfc7-2007cd91c0f1',
  })
  userId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items!: CreateOrderItemDTO[];
}

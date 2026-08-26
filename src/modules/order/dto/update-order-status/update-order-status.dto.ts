import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../../generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateOrderStatusDTO {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @Type()
  action!: OrderStatus;
}

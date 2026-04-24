import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '875d7ceb-aca6-481c-9a30-cdcdf7e5a042',
  })
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class OrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '9aaca58e-4ea2-4008-bfc7-2007cd91c0f1',
  })
  userId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}

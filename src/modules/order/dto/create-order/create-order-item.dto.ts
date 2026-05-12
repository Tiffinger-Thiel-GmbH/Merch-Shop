import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDTO {
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

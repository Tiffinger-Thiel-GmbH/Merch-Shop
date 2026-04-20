import { IsNotEmpty, IsOptional, IsString, MaxLength } from '@nestjs/class-validator';

export class CreateOrderDto {
  @MaxLength(128)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

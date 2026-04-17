import { IsNotEmpty, IsString, IsUUID, MaxLength } from '@nestjs/class-validator';
import { UUID } from 'crypto';
import { Timestamp } from 'typeorm';

export class CreateOrderDto {
  @MaxLength(128)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  size?: string;

  @IsUUID()
  @IsNotEmpty()
  id: UUID;

  @IsString()
  @IsNotEmpty()
  costumer: string;

  @IsNotEmpty()
  createdAt: Timestamp;
}

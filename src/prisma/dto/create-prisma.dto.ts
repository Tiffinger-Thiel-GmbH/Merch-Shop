import { IsNotEmpty, IsOptional, IsString, MaxLength } from '@nestjs/class-validator';

export class CreatePrismaDto {
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

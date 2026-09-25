import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssetParams {
  @IsNotEmpty()
  @ApiProperty({
    example: '22222222-2222-4222-8222-222222222222',
    description: 'Asset name, usually UUID',
  })
  @IsString()
  id!: string;
}

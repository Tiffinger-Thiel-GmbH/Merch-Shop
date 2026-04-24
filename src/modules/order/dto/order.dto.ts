import { IsNotEmpty, IsTimeZone, IsUUID } from 'class-validator';

export class OrderDto {
  @IsUUID()
  @IsNotEmpty()
  id;

  @IsUUID()
  @IsNotEmpty()
  idUser;

  @IsTimeZone()
  createdAt;
}

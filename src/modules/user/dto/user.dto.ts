import { IsDateString, IsString, IsUUID } from 'class-validator';

export class UserDTO {
  @IsString()
  name!: string;

  @IsUUID()
  id!: string;

  @IsString()
  email!: string;

  @IsDateString()
  createdAt!: string;
}

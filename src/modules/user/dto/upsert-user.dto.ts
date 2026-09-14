import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpsertUserDto {
  @IsEmail()
  @IsNotEmpty()
  userMail!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}

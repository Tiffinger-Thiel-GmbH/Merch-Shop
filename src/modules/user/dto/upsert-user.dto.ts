import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpsertUserDto {
  @IsEmail()
  @IsNotEmpty()
  userMail!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;
}

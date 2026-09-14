import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { User } from '../../generated/prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @HttpCode(HttpStatus.CREATED)
  putUser(@Body() dto: UpsertUserDto): Promise<User> {
    return this.userService.putUser(dto);
  }
}

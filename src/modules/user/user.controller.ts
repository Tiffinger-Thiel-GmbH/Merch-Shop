import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { toUserDTO } from './dto/to-user-dto.mapper';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User wurde neu angelegt', type: UserDTO })
  @ApiResponse({ status: HttpStatus.OK, description: 'User ist vorhanden', type: UserDTO })
  async putUser(@Body() dto: UpsertUserDto, @Res({ passthrough: true }) res: Response): Promise<UserDTO> {
    const user = await this.userService.putUser(dto);
    res.status(user.created ? HttpStatus.CREATED : HttpStatus.OK);
    return toUserDTO(user.user);
  }
}

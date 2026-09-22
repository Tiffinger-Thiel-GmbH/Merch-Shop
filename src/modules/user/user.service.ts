import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { UserResponseDTO } from './dto/put-user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async putUser(dto: UpsertUserDto): Promise<UserResponseDTO> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.userMail },
    });

    if (existing) {
      return { created: false, user: existing };
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.userMail,
        name: dto.userName,
      },
    });

    return { created: true, user: newUser };
  }
}

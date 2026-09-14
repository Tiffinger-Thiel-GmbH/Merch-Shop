import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { User } from '../../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async putUser(dto: UpsertUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.userMail },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.user.create({
      data: {
        email: dto.userMail,
        name: dto.userName,
      },
    });
  }
}

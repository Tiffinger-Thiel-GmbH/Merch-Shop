import { User } from '../../../generated/prisma/client';
import { UserDTO } from './user.dto';

export function toUserDTO(user: User): UserDTO {
  return {
    name: user.name,
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}

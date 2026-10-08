import { User } from '../../../generated/prisma/client';

export class UserResponseDTO {
  created!: boolean;
  user!: User;
}

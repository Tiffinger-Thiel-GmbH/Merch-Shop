import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  getTracker(req: Request): Promise<string> {
    const userId = req.get('x-user-id') || req.ip;

    if (!userId) {
      return Promise.reject(new Error('Could not determine request tracker'));
    }

    return Promise.resolve(userId);
  }
}

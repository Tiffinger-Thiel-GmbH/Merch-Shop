import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync, ReadStream } from 'fs';
import { basename, join } from 'path';

@Injectable()
export class AssetsService {
  findOne(id: string): { mimeType: string; fileName: string; content: ReadStream } {
    if (id.includes('.')) {
      throw new BadRequestException();
    }

    const localAssetPath = join('assets', 'img', `${id}.jpg`);

    if (!existsSync(localAssetPath)) {
      throw new NotFoundException();
    }

    const buffer = createReadStream(localAssetPath);
    return { mimeType: 'application/jpeg', fileName: basename(localAssetPath), content: buffer };
  }
}

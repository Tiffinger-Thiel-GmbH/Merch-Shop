import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { AssetsService } from './assets.service';

jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs');
  return {
    ...actualFs,
    existsSync: jest.fn(),
    createReadStream: jest.fn(),
  } satisfies typeof import('fs');
});

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetsService],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return the JPEG stream and filename for an existing asset', () => {
    const stream = {} as fs.ReadStream;
    jest.mocked(fs.existsSync).mockReturnValue(true);
    jest.mocked(fs.createReadStream).mockReturnValue(stream);

    expect(service.findOne('asset-1')).toEqual({
      mimeType: 'application/jpeg',
      fileName: 'asset-1.jpg',
      content: stream,
    });
    expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining('asset-1.jpg'));
    expect(fs.createReadStream).toHaveBeenCalledWith(expect.stringContaining('asset-1.jpg'));
  });

  it('should reject ids containing a dot', () => {
    expect(() => service.findOne('../secret')).toThrow(BadRequestException);
    expect(fs.existsSync).not.toHaveBeenCalled();
  });

  it('should throw when the asset does not exist', () => {
    jest.mocked(fs.existsSync).mockReturnValue(false);

    expect(() => service.findOne('missing')).toThrow(NotFoundException);
    expect(fs.createReadStream).not.toHaveBeenCalled();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StreamableFile } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { Readable } from 'stream';
import type { Response } from 'express';

describe('AssetsController', () => {
  let controller: AssetsController;
  const mockAssetsService = { findOne: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [{ provide: AssetsService, useValue: mockAssetsService }],
    }).compile();

    controller = module.get<AssetsController>(AssetsController);
  });

  it('should set download headers and return the asset as a StreamableFile', () => {
    const content = Readable.from('image');
    mockAssetsService.findOne.mockReturnValue({ mimeType: 'application/jpeg', fileName: 'asset.jpg', content });
    const setHeaders = jest.fn();
    const response = { set: setHeaders } as unknown as Response;

    const result = controller.findOne({ id: 'asset' }, response);

    expect(mockAssetsService.findOne.mock.calls).toEqual([['asset']]);
    expect(setHeaders.mock.calls).toEqual([[{
      'Content-Type': 'application/jpeg',
      'Content-Disposition': 'attachment; filename="asset.jpg"',
    }]]);
    expect(result).toBeInstanceOf(StreamableFile);
  });
});

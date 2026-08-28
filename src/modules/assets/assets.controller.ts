import { Controller, Get, Body, Param, Res, StreamableFile } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { ApiOkResponse, ApiParam, ApiProduces } from '@nestjs/swagger';
import { AssetParams } from './dts/asset-param';
import type { Response } from 'express';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    example: '22222222-2222-4222-8222-222222222222',
  })
  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiProduces('image/jpeg', 'image/png')
  findOne(@Param() params: AssetParams, @Res({ passthrough: true }) res: Response): StreamableFile {
    const { mimeType, fileName, content } = this.assetsService.findOne(params.id);

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': 'attachment; filename="' + fileName + '"',
    });

    return new StreamableFile(content, { type: mimeType });
  }
}

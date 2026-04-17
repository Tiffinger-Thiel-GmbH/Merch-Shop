import { TransformFnParams } from '@nestjs/class-transformer';
import sanitizeHtml from 'sanitize-html';

export function sanitizeHtmlTransformer(params: TransformFnParams): unknown {
  return typeof params.value === 'string' ? sanitizeHtml(params.value as string) : params.value;
}

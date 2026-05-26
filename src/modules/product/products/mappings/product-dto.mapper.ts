import { Product } from '../../../../generated/prisma/client';
import { ProductVariant } from '../../product-variant/entities/product-variant.entity';
import { ProductDTO } from '../dtos/product.dto';

export function mapProductDTO(product: Product): ProductDTO {
  return {
    id: product.id,
    name: product.name,
    description: product.description || null,
  };
}

import { Products } from '../../../generated/prisma/client';
import { ProductDTO } from '../dtos/product.dto';

export function mapProductDTO(product: Products): ProductDTO {
  return {
    id: product.id,
    name: product.name,
    size: product.size || null,
    description: product.description || null,
  };
}

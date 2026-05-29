import { ProductVariant } from '../../../../generated/prisma/client';
import { ProductVariantOutgoingDTO } from '../dto/product-variant-outgoing.dto';

export function mapProductVariantDTO(productVariant: ProductVariant): ProductVariantOutgoingDTO {
  return {
    category: productVariant.category,
    name: productVariant.name,
  };
}

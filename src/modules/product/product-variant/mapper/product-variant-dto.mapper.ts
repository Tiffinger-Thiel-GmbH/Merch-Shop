import { ProductVariant } from '../../../../generated/prisma/client';
import { ProductVariantOutgoingDTO } from '../dto/product-variant-outgoing.dto';

export function mapProductVariantDTO(productVariant: ProductVariant): ProductVariantOutgoingDTO {
  return {
    productVariantId: productVariant.id,
    category: productVariant.category,
    name: productVariant.name,
  };
}

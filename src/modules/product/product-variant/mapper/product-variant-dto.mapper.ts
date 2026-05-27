import { ProductVariantOutgoingDTO } from '../dto/product-variant-outgoing.dto';

export function mapProductVariantDTO(productVariant: ProductVariantOutgoingDTO): ProductVariantOutgoingDTO {
  return {
    category: productVariant.category,
    name: productVariant.name,
  };
}

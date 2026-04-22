import { ProductDTO } from './product.dto';

export class ProductListDTO {
  items!: ProductDTO[];
  totalCount!: number;
}

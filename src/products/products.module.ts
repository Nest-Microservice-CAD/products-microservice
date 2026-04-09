import { Module, Provider } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repository/product.repository';
import {
  CreateProductService,
  DeleteProductService,
  FindAllProductsService,
  FindProductByIdService,
  ProductsService,
  UpdateProductService,
} from './service';

const services: Provider[] = [
  ProductsService,
  CreateProductService,
  FindAllProductsService,
  FindProductByIdService,
  UpdateProductService,
  DeleteProductService,
];
const repositories: Provider[] = [ProductRepository];
@Module({
  controllers: [ProductsController],
  providers: [...services, ...repositories],
})
export class ProductsModule {}

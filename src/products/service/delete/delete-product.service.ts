import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Product } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class DeleteProductService {
  private readonly logger = new Logger(DeleteProductService.name);
  constructor(private readonly productRepository: ProductRepository) {}

  async handle(id: number): Promise<Product> {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
  }
}

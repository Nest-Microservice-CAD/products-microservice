import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Product } from '@prisma/client';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class ValidateProductsService {
  private readonly logger = new Logger(ValidateProductsService.name);

  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(ids: number[]): Promise<Product[]> {
    ids = Array.from(new Set(ids));

    try {
      const products = await this.productRepository.findByIds(ids);

      if (products.length !== ids.length) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `Some products were not found`,
        });
      }

      return products;
    } catch (error) {
      throw new RpcException({
        status: error.status ?? HttpStatus.BAD_REQUEST,
        message:
          error.message ??
          `Error getting the products, Error: ${error?.message || error}`,
      });
    }
  }
}

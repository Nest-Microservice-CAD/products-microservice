import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Product } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class FindProductByIdService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(id: number): Promise<Product> {
    const data = await this.productRepository.findOne(id);

    if (!data) {
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return data;
  }
}

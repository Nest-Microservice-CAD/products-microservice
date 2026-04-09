import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async handle(id: number): Promise<void> {
    await this.productRepository.delete(id).catch(() => {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    });
  }
}

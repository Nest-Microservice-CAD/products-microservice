import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    if (!id)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Id is required' },
        HttpStatus.BAD_REQUEST,
      );

    delete updateProductDto.id;

    await this.productRepository.update(id, updateProductDto).catch(() => {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    });
  }
}

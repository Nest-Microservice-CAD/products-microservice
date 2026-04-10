import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Id is required',
      });

    delete updateProductDto.id;
    try {
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
  }
}

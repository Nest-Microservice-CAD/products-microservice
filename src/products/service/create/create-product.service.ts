import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class CreateProductService {
  private readonly logger = new Logger(CreateProductService.name);
  constructor(private readonly productRepository: ProductRepository) {}

  public handle(dto: CreateProductDto): Promise<Product> {
    this.logger.log('Creating a new product');
    return this.productRepository.save(dto);
  }
}

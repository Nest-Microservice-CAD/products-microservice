import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto, PaginationResponseDto } from 'src/common';
import { ProductRepository } from 'src/products/repository/product.repository';

@Injectable()
export class FindAllProductsService {
  private readonly logger = new Logger(FindAllProductsService.name);
  constructor(private readonly productRepository: ProductRepository) {}
  public async handle(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto> {
    this.logger.log('Finding all products');
    const { page, limit } = paginationDto;

    return await this.productRepository.findAll(page, limit);
  }
}

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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

    try {
      return await this.productRepository.findAll(page, limit);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Error getting all products',
      });
    }
  }
}

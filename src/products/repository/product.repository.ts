import { Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from '../dto/create-product.dto';
import { PaginationResponseDto } from 'src/common';
import { UpdateProductDto } from '../dto/update-product.dto';

export class ProductRepository extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductRepository.name);
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database is success');
  }

  public async save(product: CreateProductDto): Promise<Product> {
    return await this.product.create({ data: product });
  }

  public async findAll(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto> {
    return {
      data: await this.product.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: { deleted: false },
      }),
      pagination: {
        limit,
        page,
        total: await this.product.count({ where: { deleted: false } }),
      },
    };
  }

  public async findOne(id: number): Promise<Product> {
    return await this.product.findFirst({ where: { id, deleted: false } });
  }

  public async findByIds(ids: number[]): Promise<Product[]> {
    return await this.product.findMany({
      where: {
        id: {
          in: ids,
        },
        deleted: false,
      },
    });
  }

  public async update(id: number, product: UpdateProductDto): Promise<Product> {
    return await this.product.update({ where: { id }, data: product });
  }

  public async delete(id: number): Promise<Product> {
    return await this.product.update({
      where: { id },
      data: { deleted: true },
    });
  }
}

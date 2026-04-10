import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
// import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductService } from './create/create-product.service';
import { Product } from '../entities/product.entity';
import { FindAllProductsService } from './get/find-all-products.service';
import { PaginationDto, PaginationResponseDto } from 'src/common';
import { FindProductByIdService } from './get/find-product-by-id.service';
import { UpdateProductService } from './update/update-product.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { DeleteProductService } from './delete/delete-product.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly findAllProductsService: FindAllProductsService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}
  async create(dto: CreateProductDto): Promise<Product> {
    return await this.createProductService.handle(dto);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResponseDto> {
    return await this.findAllProductsService.handle(paginationDto);
  }

  async findOne(id: number): Promise<Product> {
    return await this.findProductByIdService.handle(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.updateProductService.handle(id, updateProductDto);
  }

  async remove(id: number): Promise<Product> {
    return await this.deleteProductService.handle(id);
  }
}

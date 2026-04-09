import { Transform } from 'class-transformer';

export class Product {
  @Transform(() => Number)
  id: number;
  name: string;
  @Transform(() => Number)
  price: number;
  @Transform(({ value }) => value.Date())
  createdAt: Date;
  @Transform(({ value }) => value.Date())
  updatedAt: Date;
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
@Injectable()
export class ProductService {
  constructor(private dbService: PrismaService) {}
  async createProduct(ProductDto: ProductDto, user: number) {
    const { name, price, priceSale, Sold, In_Stock, description } = ProductDto;
    const res = await this.dbService.product.create({
      data: {
        name,
        price,
        priceSale,
        Sold,
        In_Stock,
        description,
        category_Id_Relation: user
      },
    });
    if (!res) {
      return 'error createProduct';
    }

    return res;
  }

  async getAllProduct() {
    const res = await this.dbService.product.findMany({});
    if (!res) {
      return 'error getAllProduct';
    }

    return res;
  }
}

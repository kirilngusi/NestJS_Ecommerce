import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
@Injectable()
export class CategoryService {
  constructor(private dbService: PrismaService) {}
  async createCategory(categoryDto: CategoryDto) {
    const { name } = categoryDto;
    const res = await this.dbService.category.create({
      data: {
        name,
      },
    });
    if (!res) {
      return 'error createCategory';
    }

    return res;
  }

  async getAllCategory() {
    const res = await this.dbService.category.findMany({
      include: {
        product: true,
      },
    });
    if (!res) {
      return 'error getAllCategory';
    }

    return res;
  }
}

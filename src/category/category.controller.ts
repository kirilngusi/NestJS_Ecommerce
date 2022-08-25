
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

@Controller('category')
export class CategoryController {
    constructor(private CategoryService: CategoryService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/createCategory')
    async createCategory(@Request() req) {
      // console.log(req.user);
      return this.CategoryService.createCategory(req.body);
    }

    @Get('/createCategory')
    async getAllCategory() {
      // console.log(req.user);
      return this.CategoryService.getAllCategory();
    }
}

import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createProduct')
  async createProduct(@Request() req ,  @GetUser() user:any) {
    // console.log(req.user);
    return this.ProductService.createProduct(req.body, 1);
  }

  @Get('/getAllProduct')
  async getAllCategory() {
    // console.log(req.user);
    return this.ProductService.getAllProduct();
  }
}

import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('Order')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createOrder')
  async createOrder(@Request() req ,  @GetUser() user:any) {
    // console.log(req.user);
    return this.OrderService.createOrder(req.body, 1);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/createOrderDetails')
  // async createOrderDetails(@Request() req ,  @GetUser() user:any) {
  //   // console.log(req.user);
  //   return this.OrderService.createOrderDetails(req.body, 1);
  // }

  @Get('/getAllOrder')
  async getAllCategory() {
    // console.log(req.user);
    return this.OrderService.getAllOrder();
  }
}

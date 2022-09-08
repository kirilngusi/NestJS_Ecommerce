import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto/order.dto';
@Injectable()
export class OrderService {
  constructor(private dbService: PrismaService) {}

  async createOrder(OrderDto: any, user: number) {
    const { name, email, phone_number, address, note , total_money } = OrderDto;
    const res = await this.dbService.order.create({
      data: {
        name,
        email,
        phone_number,
        address,
        note,
        total_money,
        userId: user
      },
      // include: {
      //   Order_Details: true, // Include all posts in the returned object
      // },
    });

    if(res) {
      
    }


    if (!res) {
      return 'error createOrder';
    }
    return res;
  }

  async getAllOrder() {
    const res = await this.dbService.order.findMany({
      // include: {
      //   Order_Details: true,
      // },
      include: { Order_Details: { include: { Product_Id: true } } },

    });
    if (!res) {
      return 'error getAllOrder';
    }

    return res;
  }

  async createOrderDetails(createOrderDetails: any, user: number) {
    const { orderId, productId, price, num, total_money } = createOrderDetails;
    const res = await this.dbService.order_Details.create({
      data: {
        orderId,
        productId,
        price,
        num,
        total_money
      }
      
    });
    if (!res) {
      return 'error createOrderDetails';
    }
    return res;

  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private dbService: PrismaService) {}

  async findAll(name?: string) {
    if (name) {
      return await this.dbService.test.findMany({
        where: {
          name,
        },
      });
    }
    return await this.dbService.test.findMany();
  }

  async findById(userId: number) {
    return await this.dbService.test.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    return await this.dbService.test.create({
      data,
    });
  }

  async updateUser(id: any, data: CreateUserDto) {
    return await this.dbService.test.update({
      data,
      where: {
        id,
      },
    });
  }

  async deletePost(id: number) {
    try {
      return await this.dbService.test.delete({
        where: { id },
      });
    } catch (error) {
      // this.logger.error(error.message);
      // throw new InternalServerErrorException(error.message);
      console.log(error);
    }
  }
}

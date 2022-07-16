import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async queryUsers(@Query('name') name?: string): Promise<User[]> {
    return await this.userService.findAll(name);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return await this.userService.findById(Number(id));
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  async createUser(@Body() body: { name: string }) {
    return await this.userService.createUser(body);
  }

  @UsePipes(ValidationPipe)
  @Patch('/:id')
  async updateUser(@Param('id', ParseIntPipe) id: string, @Body() body) {
    return await this.userService.updateUser(id, body);
  }

  @UsePipes(ValidationPipe)
  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: string) {
    return await this.userService.deletePost(Number(id));
  }
}

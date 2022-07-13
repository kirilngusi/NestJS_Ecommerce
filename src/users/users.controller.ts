import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers(@Query('name') name: string): User[] {
    const getName = this.userService.findAll(name);

    if(!getName) {
      throw new NotFoundException();
    }

    return getName;
  }

  @Get(':id')
  getUserById(@Param('id',ParseIntPipe) id: string): User {
    const getId = this.userService.findById(Number(id));

    if(!getId) {
      throw new NotFoundException();
    }
    return getId;
  }

  @ApiCreatedResponse({type: User})
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }
}

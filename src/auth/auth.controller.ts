import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthCredentialDto } from './dto/user.dto';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/home')
  async home(@Request() req) {
    // console.log(req.user);
    return this.authService.getUsers();
  }

  // test
  @UseGuards(JwtAuthGuard)
  @Post('/post')
  async createPost(@Request() req, @GetUser() user:any) {
    console.log('req', user);

    //decode jwt
    return this.authService.createPost(req.body, user.id);
  }
}

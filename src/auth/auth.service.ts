import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { AuthCredentialDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreatePostInput } from './dto/newPost.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dbService: PrismaService,
  ) {}

  async register(authCredentialDto: AuthCredentialDto) {
    // console.log(user);
    // const payload = { username: user.username };
    const { fullName, email, phone_number, password } = authCredentialDto;

    if (!fullName || !email || !password || !phone_number) {
      return {
        error: 'filling in the blank',
      };
    }

    const checkUser = await this.dbService.user.findUnique({
      where: { email: email },
    });
    const checkPhone = await this.dbService.user.findUnique({
      where: { phone_number: phone_number },
    });

    if (!checkUser && !checkPhone) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const user = await this.dbService.user.create({
        data: {
          fullName,
          email,
          phone_number,
          password: hash,
          role: 'USER',
        },
      });
      const payload: any = {
        fullName: user.fullName,
        email: user.email,
        id: user.id,
      };
      const accessToken: any = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });

      return {
        statusCode: 200,
        message: 'Register Success',
        data: {
          fullName: user.fullName,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
          access_token: accessToken,
        },
      };
    }
    // throw new UnauthorizedException('User Is Exist!');
    return {
      statusCode: 401,
      message: 'User Is Exist!',
    };
  }

  //login
  //except - name
  async login(authCredentialDto: Omit<AuthCredentialDto, 'fullName'>) {
    // console.log(user);
    // const payload = { username: user.username };
    const { email, password } = authCredentialDto;

    if (!email || !password) {
      return {
        error: 'filling in the blank',
      };
    }

    const checkUser = await this.dbService.user.findUnique({
      where: { email: email },
    });

    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
      const payload: any = {
        fullName: checkUser.fullName,
        email: checkUser.email,
        id: checkUser.id,
      };
      const accessToken: any = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });

      return {
        status: 'success',
        message: 'Login Success',
        data: {
          fullName: checkUser.fullName,
          email: checkUser.email,
          phone_number: checkUser.phone_number,
          role: checkUser.role,
          access_token: accessToken,
        },
      };
    }
    // throw new UnauthorizedException('User Or Password Incorrect!');
    return {
      status: 'error',
      message: 'User Or Password Incorrect!',
    };
  }
  async getUsers() {
    const allUsers = await this.dbService.user.findMany({
    });
    if (!allUsers) {
      return 'notUser';
    }

    return allUsers;
  }

  // async createPost(body: CreatePostInput, user: number) {
  //   console.log('user', user);
  //   const newPost = this.dbService.post.create({
  //     data: {
  //       published: true,
  //       title: body.title,
  //       content: body.content,

  //       //<Int> table Post relationship through  id
  //       authorId: user,
  //     },
  //   });
  //   return newPost;
  // }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { AuthCredentialDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dbService: PrismaService,
  ) {}

  //   async validateUser(username: string, pass: string): Promise<any> {
  //     // const user = await this.usersService.findOne(username);
  //     // if (user && user.password === pass) {
  //     //   const { password, ...result } = user;
  //     //   return result;
  //     // }
  //     // return null;
  //     return "hello";
  //   }

  async register(authCredentialDto: AuthCredentialDto) {
    // console.log(user);
    // const payload = { username: user.username };
    const { name, username, password } = authCredentialDto;

    if (!name || !username || !password) {
      return {
        error: 'filling in the blank',
      };
    }

    const checkUser = await this.dbService.user.findUnique({
      where: { username: username },
    });

    if (!checkUser) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const user = await this.dbService.user.create({
        data: {
          name,
          username,
          password: hash,
        },
      });
      const payload: any = { username: user.username, id: user.id };
      const accessToken: any = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });

      return {
        access_token: accessToken,
      };
    }

    return {
      error: 'User is  exist',
    };
  }

  //login
  //except - name
  async login(authCredentialDto: Omit<AuthCredentialDto, 'name'>) {
    // console.log(user);
    // const payload = { username: user.username };
    const { username, password } = authCredentialDto;

    if (!username || !password) {
      return {
        error: 'filling in the blank',
      };
    }

    const checkUser = await this.dbService.user.findUnique({
      where: { username: username },
    });

    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
      const payload: any = { username: checkUser.username, id: checkUser.id };
      const accessToken: any = this.jwtService.sign(payload, {
        expiresIn: '1d',
      });

      return {
        access_token: accessToken,
      };
    } else {
      throw new UnauthorizedException('User Or Password Incorrect!');
    }
  }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import {PrismaService} from './../prisma/prisma.service';

import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: 36000 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,JwtStrategy]
})
export class AuthModule {}

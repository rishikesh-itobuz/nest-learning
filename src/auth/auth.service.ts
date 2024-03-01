import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginArgs, SignupArgs } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async userSignUp(args: SignupArgs) {
    const userData = await this.prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (userData) {
      throw new HttpException(
        'Email already exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    //bycrypt password
    const userId = uuid();

    await this.prisma.user.create({
      data: {
        id: userId,
        ...args,
      },
    });

    return {
      accessToken: await this.jwtService.signAsync({
        id: uuid(),
        roles: userData.roles,
      }),
    };
  }

  async userLogin(args: LoginArgs) {
    const { email, password } = args;
    //currently not encrypting the password
    const userData = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!userData) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      accessToken: await this.jwtService.signAsync({
        id: userData.id,
        roles: userData.roles,
      }),
    };
  }

  async getUserProfile(request: Request) {
    return await this.prisma.user.findFirst({
      where: {
        id: request['user'].id,
      },
      select: {
        name: true,
        email: true,
        roles: true,
      },
    });
  }
}

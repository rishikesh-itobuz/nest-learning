import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { signupArgs } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async userSignUp(args: signupArgs) {
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
      accessToken: await this.jwtService.signAsync({ id: uuid() }),
    };
  }
}

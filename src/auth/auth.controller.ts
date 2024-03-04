import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginArgs, SignupArgs } from './dto/auth.dto';
import {
  SignupResponse,
  userProfileResponseArgs,
} from './interfaces/auth.interface';
import { AuthGuard } from 'src/guards/auth.gard';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.gard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  userSignUp(@Body() args: SignupArgs): Promise<SignupResponse> {
    return this.authService.userSignUp(args);
  }

  @Post('login')
  userLogin(@Body() args: LoginArgs): Promise<SignupResponse> {
    return this.authService.userLogin(args);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post('profile')
  @Roles(['admin'])
  getUserProfile(@Req() request: Request): Promise<userProfileResponseArgs> {
    return this.authService.getUserProfile(request);
  }
}

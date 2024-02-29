import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupArgs } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  userSignUp(@Body() args: signupArgs): Promise<string> {
    return this.authService.userSignUp(args);
  }
}

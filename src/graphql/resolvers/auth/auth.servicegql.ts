import { Injectable } from '@nestjs/common';
import { SignupArgsGQl } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async userSignup(args: SignupArgsGQl) {
    console.log(args);
    return 'user successfully signed in';
  }
}

import { Injectable } from '@nestjs/common';
import { signupArgs } from './dto/auth.dto';
@Injectable()
export class AuthService {
  async userSignUp(args: signupArgs) {
    const { email, password, name } = args;
    console.log(email, password, name);
    return 'hello';
  }
}

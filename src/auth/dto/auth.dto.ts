import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupArgs {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required !' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  roles: string[];
}

export class LoginArgs {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required !' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}

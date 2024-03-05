import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class SignupArgsGQl {
  @Field({ nullable: false })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Field(() => String, { nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];
}

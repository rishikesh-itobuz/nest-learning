import {
  Args,
  Context,
  GraphQLExecutionContext,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.servicegql';
import { SignupArgsGQl } from './dto/auth.dto';
import { AuthGuard } from 'src/guards/auth.gard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class authResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard)
  @Query(() => String)
  async userSignup(
    @Args() args: SignupArgsGQl,
    @Context() ctx: GraphQLExecutionContext,
  ) {
    // const ctx = GqlExecutionContext.create(context);
    console.log(ctx['req'].user);
    return this.authService.userSignup(args);
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    // check applied to validate the provide role matches the user assigned role
    let isValidRole = false;
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < user.roles.length; j++) {
        if (roles[i] === user.roles[j]) {
          isValidRole = true;
          break;
        }
        if (isValidRole) {
          break;
        }
      }
    }
    if (!isValidRole) {
      throw new UnauthorizedException();
    }
    return isValidRole;
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from '~shared/infrastructure/network/Request';
import { Authorized } from '~shared/infrastructure/network/Authorized';
import { Role } from '~user/domain';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Authorized, context.getHandler());
    if (!roles) {
      return true;
    }

    const [role] = roles;

    const request = context.switchToHttp().getRequest() as Request;

    const { user } = request;

    if (request.params.id === user.id || user.role === Role.admin) {
      return true;
    }

    if (user.role !== role) {
      throw new Error('User not authorized');
    }

    return true;
  }
}

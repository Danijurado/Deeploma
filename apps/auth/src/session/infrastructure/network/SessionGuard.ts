import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from '~shared/infrastructure/network/Request';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const decorated = this.reflector.get(Authenticated, context.getHandler());
    if (!decorated) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;

    if (!request.session) {
      throw new UnauthorizedException('Session not found');
    }

    return true;
  }
}

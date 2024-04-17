import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from '~shared/infrastructure/network/Request';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SessionMiddleware.name);

  constructor(private configService: ConfigService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const token = req.cookies?.jwt || this.tokenFromHeader(req);

    if (!token) {
      return next();
    }

    try {
      const session = jwt.verify(token, this.configService.get('JWT_SECRET'));

      req.session = session;
    } catch (error) {
      this.logger.error(error);
    } finally {
      next();
    }
  }

  private tokenFromHeader(req: Request) {
    const token = req.headers.authorization;
    if (!token) {
      return;
    }

    return token.replace('Bearer ', '');
  }
}

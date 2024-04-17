import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request } from '~shared/infrastructure/network/Request';
import { Response, NextFunction } from 'express';
import { UserReadByIdQuery } from '~user/application/read/UserReadByIdQuery';
import { QueryBus } from '@nestjs/cqrs';
import { UserQueryResponse } from '~user/application/UserQueryResponse';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private readonly logger = new Logger(UserMiddleware.name);

  constructor(private readonly querybus: QueryBus) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (!req.session) {
      return next();
    }

    const query = new UserReadByIdQuery(req.session.userId);

    try {
      const user = await this.querybus.execute<
        UserReadByIdQuery,
        UserQueryResponse
      >(query);

      req.user = {
        id: user.id.value,
        instructorId: user.instructorId?.value,
        role: user.role,
        email: user.email,
      };

      next();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}

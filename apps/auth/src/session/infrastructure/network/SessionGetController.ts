import {
  Get,
  Controller,
  Query,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { createHash } from 'node:crypto';
import { SessionReadByLinkTokenQuery } from '~session/application/read/SessionReadByLinkTokenQuery';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Request } from '~shared/infrastructure/network/Request';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';

const SESSION_EXPIRATION = 30 * 24 * 60 * 60 * 1000;

@Controller('sessions')
class SessionGetController {
  constructor(
    private readonly querybus: QueryBus,
    private configService: ConfigService,
  ) {}

  @Get('/')
  async findOne(
    @Res() res: Response,
    @Query('linkToken') linkToken: string,
  ): Promise<void> {
    const hashedLinkToken = createHash('sha256')
      .update(linkToken)
      .digest('hex');

    const query = new SessionReadByLinkTokenQuery(hashedLinkToken);

    const response = await this.querybus.execute(query);

    if (!response) {
      throw new UnauthorizedException('Session not found');
    }

    const token = jwt.sign(
      { id: response.id.value, userId: response.userId },
      this.configService.get('JWT_SECRET'),
    );

    if (this.configService.get('APP_ENV') === 'development') {
      res.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + SESSION_EXPIRATION),
      });

      res.redirect('http://localhost:3000');
    } else {
      res.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + SESSION_EXPIRATION),
        domain: 'deeploma.me',
      });

      res.redirect('https://deeploma.me');
    }
  }

  @Get('/verify')
  @Authenticated()
  async verify(@Req() req: Request, @Res() res: Response): Promise<void> {
    res.json(req.session);
  }
}

export { SessionGetController };

import { Controller, Delete, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('sessions')
class SessionDeleteControler {
  constructor(private configService: ConfigService) {}

  @Delete('/:id')
  async logout(@Res() res: Response): Promise<void> {
    const options = {};

    if (this.configService.get('APP_ENV') === 'production') {
      options['domain'] = 'deeploma.me';
    }

    res.clearCookie('jwt', options);
    res.end();
  }
}

export { SessionDeleteControler };

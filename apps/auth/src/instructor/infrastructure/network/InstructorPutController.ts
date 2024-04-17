import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from '~shared/infrastructure/network/Request';
import { Id } from '~shared/domain';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';
import { InstructorNotFoundError } from '../../domain/InstructorNotFoundError';
import { InstructorUpdateCommand } from '../../application/update/InstructorUpdateCommand';
import { InstructorDTO } from './InstructorDTO';
import { Authorized } from '~shared/infrastructure/network/Authorized';
import { InstructorNotAuthorizedError } from '../../domain/InstructorNotAuthorizedError';

@Controller('instructors')
class InstructorPutController {
  constructor(private readonly commandBus: CommandBus) {}

  @Authorized(['instructor'])
  @Authenticated()
  @Put('/:id')
  async update(
    @Body() body: InstructorDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { userId } = req.session;
    const { id } = req.params;

    const command = new InstructorUpdateCommand({
      ...body,
      id: new Id(id),
      userId: new Id(userId),
    });

    try {
      await this.commandBus.execute(command);
    } catch (error) {
      if (error instanceof InstructorNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof InstructorNotAuthorizedError) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      } else throw error;
    }

    return res.status(200).end();
  }
}

export { InstructorPutController };

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { InstructorDTO } from './InstructorDTO';
import { InstructorCreateCommand } from '../../application/create';
import { Request } from '~shared/infrastructure/network/Request';
import { Id } from '~shared/domain';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';
import { InstructorConflictError } from '../../domain/InstructorConflictError';
import { Authorized } from '~shared/infrastructure/network/Authorized';

@Controller('instructors')
class InstructorPostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Authorized(['instructor'])
  @Authenticated()
  @Post('/')
  async register(
    @Body() body: InstructorDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { userId } = req.session;
    const command = new InstructorCreateCommand({
      ...body,
      userId: new Id(userId),
    });

    try {
      await this.commandBus.execute(command);
    } catch (error) {
      if (error instanceof InstructorConflictError) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      } else {
        throw error;
      }
    }

    return res.status(201).end();
  }
}

export { InstructorPostController };

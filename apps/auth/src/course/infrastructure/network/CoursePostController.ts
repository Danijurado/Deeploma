import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CourseCreateCommand } from '../../application/create/CourseCreateCommand';
import { CourseCreateDTO } from './CourseCreateDTO';
import { Request } from '~shared/infrastructure/network/Request';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';
import { Id } from '~shared/domain';
import { Authorized } from '~shared/infrastructure/network/Authorized';

@Controller('courses')
class CoursePostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Authorized(['instructor'])
  @Post('/')
  @Authenticated()
  async register(
    @Body() body: CourseCreateDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const {
      user: { instructorId },
    } = req;

    const command = new CourseCreateCommand({
      ...body,
      instructorId: new Id(instructorId),
    });

    this.commandBus.execute(command);

    return res.status(201).end();
  }
}

export { CoursePostController };

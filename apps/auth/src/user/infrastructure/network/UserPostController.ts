import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserRegisterDTO } from './UserRegisterDTO';
import { Response } from 'express';
import { UserCreateCommand } from '~user/application';
import { CommandBus } from '@nestjs/cqrs';

@Controller('users')
class UserPostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  register(@Body() body: UserRegisterDTO, @Res() res: Response) {
    const command = new UserCreateCommand(body);

    this.commandBus.execute(command);

    return res.status(201).end();
  }
}

export { UserPostController };

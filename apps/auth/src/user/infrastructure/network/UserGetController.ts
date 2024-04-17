import {
  Get,
  UseInterceptors,
  Controller,
  Param,
  ClassSerializerInterceptor,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';
import { Authorized } from '~shared/infrastructure/network/Authorized';
import { UserReadByIdQuery } from '~user/application/read/UserReadByIdQuery';
import { UserNotFoundError } from '~user/domain/UserNotFoundError';

@Controller('users')
class UserGetController {
  constructor(private readonly querybus: QueryBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Authorized(['admin'])
  @Authenticated()
  async findOne(@Param('id') id: string): Promise<string> {
    const query = new UserReadByIdQuery(id);

    try {
      return await this.querybus.execute(query);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else {
        throw error;
      }
    }
  }
}

export { UserGetController };

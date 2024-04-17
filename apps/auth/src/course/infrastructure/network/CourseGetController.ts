import {
  Get,
  Controller,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CourseReadAllQuery } from '../../application/read/CourseReadAllQuery';
import { CourseReadByIdQuery } from '../../application/read/CourseReadByIdQuery';
import { CourseReadByUrlQuery } from '../../application/read/CourseReadByUrlQuery';
import { CourseNotFoundError } from '../../domain/CourseNotFoundError';
import { Id } from '~shared/domain';
import { Request } from '~shared/infrastructure/network/Request';

@Controller('courses')
class CourseGetController {
  constructor(private readonly querybus: QueryBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async findAll() {
    const query = new CourseReadAllQuery();

    const response = await this.querybus.execute(query);

    return response;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':slug')
  async findOne(@Param('slug') slug: string, @Req() req: Request) {
    try {
      const query = this.getReadQuery(slug, req.session !== undefined);
      return await this.querybus.execute(query);
    } catch (error) {
      if (error instanceof CourseNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw error;
      }
    }
  }

  private getReadQuery(slug: string, authenticated: boolean) {
    try {
      const id = new Id(slug);
      return new CourseReadByIdQuery(id.value, authenticated);
    } catch (error) {
      return new CourseReadByUrlQuery(slug, authenticated);
    }
  }
}

export { CourseGetController };

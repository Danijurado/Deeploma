import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CourseReadByIdQuery } from './CourseReadByIdQuery';
import { CourseRepository } from '../../domain/CourseRepository';
import { CourseQueryResponse } from '../CourseQueryResponse';
import { CourseNotFoundError } from '../../domain/CourseNotFoundError';

@QueryHandler(CourseReadByIdQuery)
class CourseReadQueryByIdHandler
  implements IQueryHandler<CourseReadByIdQuery, CourseQueryResponse>
{
  constructor(
    @Inject(CourseRepository) private respository: CourseRepository,
    private configService: ConfigService,
  ) {}

  async execute(query: CourseReadByIdQuery): Promise<CourseQueryResponse> {
    const course = await this.respository.readById(query.id);

    if (!course) {
      throw new CourseNotFoundError('Course not found');
    }

    return new CourseQueryResponse(
      course,
      this.configService.get('CDN_URL'),
      query.authenticated,
    );
  }
}

export { CourseReadQueryByIdHandler };

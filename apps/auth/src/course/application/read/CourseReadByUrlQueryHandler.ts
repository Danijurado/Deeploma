import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CourseRepository } from '../../domain/CourseRepository';
import { CourseQueryResponse } from '../CourseQueryResponse';
import { CourseReadByUrlQuery } from './CourseReadByUrlQuery';
import { CourseNotFoundError } from '../../domain/CourseNotFoundError';

@QueryHandler(CourseReadByUrlQuery)
class CourseReadQueryByUrlHandler
  implements IQueryHandler<CourseReadByUrlQuery, CourseQueryResponse>
{
  constructor(
    @Inject(CourseRepository) private respository: CourseRepository,
    private configService: ConfigService,
  ) {}

  async execute(query: CourseReadByUrlQuery): Promise<CourseQueryResponse> {
    const course = await this.respository.readByUrl(query.url);

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

export { CourseReadQueryByUrlHandler };

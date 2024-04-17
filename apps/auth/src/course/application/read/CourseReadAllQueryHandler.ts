import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CourseRepository } from '../../domain/CourseRepository';
import { CourseReadAllQuery } from './CourseReadAllQuery';
import { CourseQueryResponse } from '../CourseQueryResponse';
import { ConfigService } from '@nestjs/config';

@QueryHandler(CourseReadAllQuery)
class CourseReadAllQueryHandler
  implements IQueryHandler<CourseReadAllQuery, CourseQueryResponse[]>
{
  constructor(
    @Inject(CourseRepository) private respository: CourseRepository,
    private configService: ConfigService,
  ) {}

  async execute(): Promise<CourseQueryResponse[]> {
    const courses = await this.respository.read();

    return courses.map((course) => {
      return new CourseQueryResponse(course, this.configService.get('CDN_URL'));
    });
  }
}

export { CourseReadAllQueryHandler };

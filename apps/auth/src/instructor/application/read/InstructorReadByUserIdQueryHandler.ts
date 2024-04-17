import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InstructorRepository } from '../../domain';
import { InstructorQueryResponse } from '../InstructorQueryResponse';
import { InstructorReadByUserIdQuery } from './InstructorReadByUserIdQuery';
import { InstructorNotFoundError } from '../../domain/InstructorNotFoundError';
import { Id } from '~shared/domain';

@QueryHandler(InstructorReadByUserIdQuery)
class InstructorReadQueryByUserIdHandler
  implements
    IQueryHandler<InstructorReadByUserIdQuery, InstructorQueryResponse>
{
  constructor(
    @Inject(InstructorRepository) private respository: InstructorRepository,
    private configService: ConfigService,
  ) {}

  async execute(
    query: InstructorReadByUserIdQuery,
  ): Promise<InstructorQueryResponse> {
    const instructor = await this.respository.readByUserId(
      new Id(query.userId),
    );
    if (!instructor) {
      throw new InstructorNotFoundError('Instructor not found');
    }

    return new InstructorQueryResponse(
      instructor,
      this.configService.get('CDN_URL'),
    );
  }
}

export { InstructorReadQueryByUserIdHandler };

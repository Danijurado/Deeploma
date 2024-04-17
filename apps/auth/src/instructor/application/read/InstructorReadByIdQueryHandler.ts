import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InstructorReadByIdQuery } from './InstructorReadByIdQuery';
import { InstructorRepository } from '../../domain';
import { InstructorQueryResponse } from '../InstructorQueryResponse';
import { InstructorNotFoundError } from '../../domain/InstructorNotFoundError';
import { ConfigService } from '@nestjs/config';

@QueryHandler(InstructorReadByIdQuery)
class InstructorReadQueryByIdHandler
  implements IQueryHandler<InstructorReadByIdQuery, InstructorQueryResponse>
{
  constructor(
    @Inject(InstructorRepository) private respository: InstructorRepository,
    private configService: ConfigService,
  ) {}

  async execute(
    query: InstructorReadByIdQuery,
  ): Promise<InstructorQueryResponse> {
    const instructor = await this.respository.readById(query.id);
    if (!instructor) {
      throw new InstructorNotFoundError('Instructor not found');
    }

    return new InstructorQueryResponse(
      instructor,
      this.configService.get('CDN_URL'),
    );
  }
}

export { InstructorReadQueryByIdHandler };

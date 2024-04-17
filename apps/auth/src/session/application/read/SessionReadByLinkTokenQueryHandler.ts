import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { SessionReadByLinkTokenQuery } from './SessionReadByLinkTokenQuery';
import { SessionRepository } from '~session/domain/SessionRepository';
import { SessionQueryResponse } from '../SessionQueryResponse';

@QueryHandler(SessionReadByLinkTokenQuery)
class SessionReadQueryByLinkTokenHandler
  implements IQueryHandler<SessionReadByLinkTokenQuery, SessionQueryResponse>
{
  constructor(
    @Inject(SessionRepository) private respository: SessionRepository,
  ) {}

  async execute(
    query: SessionReadByLinkTokenQuery,
  ): Promise<SessionQueryResponse> {
    const session = await this.respository.readByLinkToken(query.linkToken);
    if (!session) {
      return;
    }

    return new SessionQueryResponse(session);
  }
}

export { SessionReadQueryByLinkTokenHandler };

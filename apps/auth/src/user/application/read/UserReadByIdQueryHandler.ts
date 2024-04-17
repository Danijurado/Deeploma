import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '~user/domain';

import { UserReadByIdQuery } from './UserReadByIdQuery';
import { UserQueryResponse } from '../UserQueryResponse';
import { UserNotFoundError } from '~user/domain/UserNotFoundError';

@QueryHandler(UserReadByIdQuery)
class UserReadQueryByIdHandler
  implements IQueryHandler<UserReadByIdQuery, UserQueryResponse>
{
  constructor(@Inject(UserRepository) private respository: UserRepository) {}

  async execute(query: UserReadByIdQuery): Promise<UserQueryResponse> {
    const user = await this.respository.readById(query.id);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    return new UserQueryResponse({
      id: user.id,
      email: user.email,
      role: user.role,
      instructorId: user.instructorId,
    });
  }
}

export { UserReadQueryByIdHandler };

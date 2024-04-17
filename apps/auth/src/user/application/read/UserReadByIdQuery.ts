import { Query } from '~shared/domain';

class UserReadByIdQuery implements Query {
  constructor(public readonly id: string) {}
}

export { UserReadByIdQuery };

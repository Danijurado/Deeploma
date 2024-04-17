import { Query } from '~shared/domain';

class InstructorReadByUserIdQuery implements Query {
  constructor(public readonly userId: string) {}
}

export { InstructorReadByUserIdQuery };

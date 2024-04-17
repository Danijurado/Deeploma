import { Query } from '~shared/domain';

class InstructorReadByIdQuery implements Query {
  constructor(public readonly id: string) {}
}

export { InstructorReadByIdQuery };

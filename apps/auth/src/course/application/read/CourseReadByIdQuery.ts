import { Query } from '~shared/domain';

class CourseReadByIdQuery implements Query {
  constructor(
    public readonly id: string,
    public readonly authenticated,
  ) {}
}

export { CourseReadByIdQuery };

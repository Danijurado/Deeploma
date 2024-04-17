import { Query } from '~shared/domain';

class CourseReadByUrlQuery implements Query {
  constructor(
    public readonly url: string,
    public readonly authenticated,
  ) {}
}

export { CourseReadByUrlQuery };

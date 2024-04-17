import { Exclude, Transform } from 'class-transformer';
import { Id } from '~shared/domain';
import { Course } from '../domain/Course';
import { Serializer } from '~shared/application/Serializer';

class CourseQueryResponse extends Serializer {
  @Transform(({ value: id }: { value: Id }) => id.value)
  id: Id;
  @Transform(({ value: id }: { value: Id }) => id.value)
  instructorId: Id;
  title: string;
  subtitle: string;
  description: string;
  @Transform(
    ({ value: resource, obj }: { value: string; obj: CourseQueryResponse }) => {
      if (obj.authenticated) {
        return `${obj.cdn}/${resource}`;
      }
    },
  )
  resource: string;
  url: string;

  @Exclude()
  private cdn: string;
  @Exclude()
  private authenticated: boolean;

  constructor(
    partial: Partial<Course>,
    cdn: string,
    authenticated: boolean = false,
  ) {
    super();
    Object.assign(this, partial);
    this.cdn = cdn;
    this.authenticated = authenticated;
  }
}

export { CourseQueryResponse };

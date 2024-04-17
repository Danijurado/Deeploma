import { Exclude, Transform } from 'class-transformer';
import { Id } from '~shared/domain';
import { Instructor } from '../domain';
import { Serializer } from '~shared/application/Serializer';

class InstructorQueryResponse extends Serializer {
  @Transform(({ value: id }: { value: Id }) => id.value)
  id: Id;
  name: string;
  profession: string;
  @Transform(
    ({
      value: photo,
      obj,
    }: {
      value: string;
      obj: InstructorQueryResponse;
    }) => {
      return `${obj.cdn}/${photo}`;
    },
  )
  photo: string;
  description: string;

  @Exclude()
  private cdn: string;

  constructor(partial: Partial<Instructor>, cdn: string) {
    super();
    Object.assign(this, partial);

    this.cdn = cdn;
  }
}

export { InstructorQueryResponse };

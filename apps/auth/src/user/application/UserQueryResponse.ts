import { Transform } from 'class-transformer';
import { Serializer } from '~shared/application/Serializer';
import { Id } from '~shared/domain';
import { User, Role } from '~user/domain';

class UserQueryResponse extends Serializer {
  @Transform(({ value: id }: { value: Id }) => id.value)
  id: Id;
  email: string;
  role: Role;
  @Transform(({ value: id }: { value: Id }) => id?.value)
  instructorId?: Id;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

export { UserQueryResponse };

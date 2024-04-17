import { Transform } from 'class-transformer';
import { Session } from '~session/domain';
import { Serializer } from '~shared/application/Serializer';
import { Id } from '~shared/domain';

class SessionQueryResponse extends Serializer {
  @Transform(({ value: id }: { value: Id }) => id.value)
  id: Id;
  @Transform(({ value: id }: { value: Id }) => id.value)
  userId: Id;
  linkToken: string;

  constructor(partial: Partial<Session>) {
    super();
    Object.assign(this, partial);
  }
}

export { SessionQueryResponse };

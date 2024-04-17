import { AggregateRoot, Id } from '~shared/domain';

import { UserCreatedEvent } from './UserCreatedEvent';
import { UserRegisteredEvent } from './UserRegisteredEvent';
import { Role } from './Role';
import { UserUpdatedEvent } from './UserUpdatedEvent';

class User extends AggregateRoot {
  constructor(
    public id: Id,
    public email: string,
    public role: Role,
    public instructorId?: Id,
  ) {
    super();
  }

  static create(id: Id, email: string): User {
    const user = new User(id, email, Role.default);

    user.record(
      new UserCreatedEvent(id, {
        email: user.email,
      }),
    );

    return user;
  }

  register() {
    this.record(
      new UserRegisteredEvent(this.id, {
        email: this.email,
        role: this.role.valueOf(),
      }),
    );
  }

  update(instructorId: Id) {
    this.instructorId = instructorId;

    this.record(
      new UserUpdatedEvent(this.id, {
        instructorId: this.instructorId.value,
      }),
    );
  }
}

export { User };

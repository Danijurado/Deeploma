import { Event, Id } from '~shared/domain';

type UserCreatedEventData = {
  email: string;
};

class UserCreatedEvent extends Event<UserCreatedEventData> {
  constructor(aggregateRootId: Id, data: UserCreatedEventData) {
    super('user.created', aggregateRootId.value, data);
  }
}

export { UserCreatedEvent };

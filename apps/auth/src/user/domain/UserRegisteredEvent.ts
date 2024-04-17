import { Event, Id } from '~shared/domain';

type UserRegisteredEventData = {
  email: string;
  role: string;
};

class UserRegisteredEvent extends Event<UserRegisteredEventData> {
  constructor(aggregateRootId: Id, data: UserRegisteredEventData) {
    super('user.registered', aggregateRootId.value, data);
  }
}

export { UserRegisteredEvent };

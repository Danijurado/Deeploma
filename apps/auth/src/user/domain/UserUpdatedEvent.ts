import { Event, Id } from '~shared/domain';

type UserUpdatedEventData = {
  instructorId: string;
};

class UserUpdatedEvent extends Event<UserUpdatedEventData> {
  constructor(aggregateRootId: Id, data: UserUpdatedEventData) {
    super('user.updated', aggregateRootId.value, data);
  }
}

export { UserUpdatedEvent };

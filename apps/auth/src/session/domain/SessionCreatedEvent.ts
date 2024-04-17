import { Event, Id } from '~shared/domain';

type SessionCreatedEventData = {
  userId: string;
};

class SessionCreatedEvent extends Event<SessionCreatedEventData> {
  constructor(aggregateRootId: Id, data: SessionCreatedEventData) {
    super('session.created', aggregateRootId.value, data);
  }
}

export { SessionCreatedEvent };

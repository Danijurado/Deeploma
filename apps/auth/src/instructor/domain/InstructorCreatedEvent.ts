import { Event, Id } from '~shared/domain';

type InstructorCreatedEventData = {
  userId: string;
  name: string;
  profession: string;
  photo?: string;
  description: string;
};

class InstructorCreatedEvent extends Event<InstructorCreatedEventData> {
  constructor(aggregateRootId: Id, data: InstructorCreatedEventData) {
    super('instructor.created', aggregateRootId.value, data);
  }
}

export { InstructorCreatedEvent };

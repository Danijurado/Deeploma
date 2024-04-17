import { Event, Id } from '~shared/domain';

type InstructorUpdatedEventData = {
  name: string;
  profession: string;
  photo?: string;
  description: string;
};

class InstructorUpdatedEvent extends Event<InstructorUpdatedEventData> {
  constructor(aggregateRootId: Id, data: InstructorUpdatedEventData) {
    super('instructor.updated', aggregateRootId.value, data);
  }
}

export { InstructorUpdatedEvent };

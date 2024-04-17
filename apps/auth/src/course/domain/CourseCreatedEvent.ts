import { Event, Id } from '~shared/domain';

type CourseCreatedEventData = {
  title: string;
  subtitle: string;
  description: string;
  instructorId: string;
  resource: string;
  resourceThumbnail: string;
  url: string;
};

class CourseCreatedEvent extends Event<CourseCreatedEventData> {
  constructor(aggregateRootId: Id, data: CourseCreatedEventData) {
    super('course.created', aggregateRootId.value, data);
  }
}

export { CourseCreatedEvent };

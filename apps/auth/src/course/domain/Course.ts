import { AggregateRoot, Id } from '~shared/domain';
import { CourseCreatedEvent } from './CourseCreatedEvent';

class Course extends AggregateRoot {
  constructor(
    public id: Id,
    public title: string,
    public subtitle: string,
    public description: string,
    public instructorId: Id,
    public resource: string,
    public resourceThumbnail: string,
    public url: string,
  ) {
    super();
  }

  static create(
    id: Id,
    title: string,
    subtitle: string,
    description: string,
    instructorId: Id,
    resource: string,
    resourceThumbnail: string,
  ): Course {
    const url = title.toLowerCase().replaceAll(' ', '-');
    const course = new Course(
      id,
      title,
      subtitle,
      description,
      instructorId,
      resource,
      resourceThumbnail,
      url,
    );

    course.record(
      new CourseCreatedEvent(id, {
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        instructorId: course.instructorId.value,
        resource: course.resource,
        resourceThumbnail: course.resourceThumbnail,
        url: course.url,
      }),
    );

    return course;
  }
}

export { Course };

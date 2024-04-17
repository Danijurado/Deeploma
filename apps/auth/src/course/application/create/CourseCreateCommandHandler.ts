import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Id } from '~shared/domain';
import { CourseCreateCommand } from './CourseCreateCommand';
import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';

@CommandHandler(CourseCreateCommand)
class CourseCreateCommandHandler
  implements ICommandHandler<CourseCreateCommand>
{
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(CourseRepository) private repository: CourseRepository,
  ) {}

  async execute(command: CourseCreateCommand): Promise<void> {
    const {
      data: {
        title,
        subtitle,
        description,
        resource,
        resourceThumbnail,
        instructorId,
      },
    } = command;

    const course = Course.create(
      Id.generate(),
      title,
      subtitle,
      description,
      instructorId,
      resource,
      resourceThumbnail,
    );

    await this.repository.save(course);
    await this.bus.publishAll(course.pullDomainEvents());
  }
}

export { CourseCreateCommandHandler };

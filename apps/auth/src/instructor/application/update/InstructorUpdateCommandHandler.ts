import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Id } from '~shared/domain';
import { InstructorUpdateCommand } from './InstructorUpdateCommand';
import { Instructor, InstructorRepository } from '../../domain';
import { InstructorNotFoundError } from '../../domain/InstructorNotFoundError';
import { InstructorNotAuthorizedError } from '../../domain/InstructorNotAuthorizedError';

@CommandHandler(InstructorUpdateCommand)
class InstructorUpdateCommandHandler
  implements ICommandHandler<InstructorUpdateCommand>
{
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(InstructorRepository) private repository: InstructorRepository,
  ) {}

  async execute(command: InstructorUpdateCommand): Promise<void> {
    const {
      data: { id, userId, name, profession, description, photo },
    } = command;

    const instructor = await this.updateInstructor(
      id,
      userId,
      name,
      profession,
      description,
      photo,
    );

    await this.bus.publishAll(instructor.pullDomainEvents());
  }

  private async updateInstructor(
    id: Id,
    userId: Id,
    name: string,
    profession: string,
    description: string,
    photo?: string,
  ): Promise<Instructor> {
    const instructor = await this.repository.readById(id.value);

    if (!instructor) {
      throw new InstructorNotFoundError('Instructor not found');
    }

    if (instructor.userId.value !== userId.value) {
      throw new InstructorNotAuthorizedError(
        'You are not authorized to update this instructor',
      );
    }

    instructor.update(name, profession, description, photo);

    await this.repository.update(instructor);

    return instructor;
  }
}

export { InstructorUpdateCommandHandler };

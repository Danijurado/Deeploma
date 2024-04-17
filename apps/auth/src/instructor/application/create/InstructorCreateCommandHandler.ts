import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Id } from '~shared/domain';
import { InstructorCreateCommand } from './InstructorCreateCommand';
import { Instructor, InstructorRepository } from '../../domain';
import { InstructorConflictError } from '../../domain/InstructorConflictError';

@CommandHandler(InstructorCreateCommand)
class InstructorCreateCommandHandler
  implements ICommandHandler<InstructorCreateCommand>
{
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(InstructorRepository) private repository: InstructorRepository,
  ) {}

  async execute(command: InstructorCreateCommand): Promise<void> {
    const {
      data: { userId, name, profession, description, photo },
    } = command;

    const instructor = await this.createInstructor(
      userId,
      name,
      profession,
      description,
      photo,
    );

    await this.bus.publishAll(instructor.pullDomainEvents());
  }

  private async createInstructor(
    userId: Id,
    name: string,
    profession: string,
    description: string,
    photo?: string,
  ): Promise<Instructor> {
    const _instructor = await this.repository.readByUserId(userId);

    if (_instructor) {
      throw new InstructorConflictError('Instructor already exists');
    }

    const instructor = Instructor.create(
      Id.generate(),
      userId,
      name,
      profession,
      description,
      photo,
    );

    await this.repository.save(instructor);

    return instructor;
  }
}

export { InstructorCreateCommandHandler };

import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Id } from '~shared/domain';
import { UserUpdateCommand } from './UserUpdateCommand';
import { User, UserRepository } from '~user/domain';
import { UserNotFoundError } from '~user/domain/UserNotFoundError';

@CommandHandler(UserUpdateCommand)
class UserUpdateCommandHandler implements ICommandHandler<UserUpdateCommand> {
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(UserRepository) private repository: UserRepository,
  ) {}

  async execute(command: UserUpdateCommand): Promise<void> {
    const {
      data: { id, instructorId },
    } = command;
    const instructor = await this.updateUser(id, instructorId);

    await this.bus.publishAll(instructor.pullDomainEvents());
  }

  private async updateUser(id: Id, instructorId: Id): Promise<User> {
    const user = await this.repository.readById(id.value);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    user.update(instructorId);

    await this.repository.update(user);

    return user;
  }
}

export { UserUpdateCommandHandler };

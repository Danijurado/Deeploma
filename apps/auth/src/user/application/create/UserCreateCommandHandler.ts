import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User, UserRepository } from '~user/domain';
import { UserCreateCommand } from './UserCreateCommand';
import { Id } from '~shared/domain';

@CommandHandler(UserCreateCommand)
class UserCreateCommandHandler implements ICommandHandler<UserCreateCommand> {
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(UserRepository) private repository: UserRepository,
  ) {}

  async execute(command: UserCreateCommand): Promise<void> {
    const {
      data: { email },
    } = command;
    const user = await this.findOrCreateUser(email);
    user.register();

    await this.bus.publishAll(user.pullDomainEvents());
  }

  private async findOrCreateUser(email: string): Promise<User> {
    const _user = await this.repository.read(email);

    if (_user) {
      return _user;
    }

    const user = User.create(Id.generate(), email);

    await this.repository.save(user);

    return user;
  }
}

export { UserCreateCommandHandler };

import { Command } from '~shared/domain';

type UserCreateCommandData = {
  email: string;
};

class UserCreateCommand extends Command<UserCreateCommandData> {}

export { UserCreateCommand };

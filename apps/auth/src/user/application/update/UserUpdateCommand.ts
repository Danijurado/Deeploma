import { Command, Id } from '~shared/domain';

type UserUpdateCommandData = {
  id: Id;
  instructorId: Id;
};

class UserUpdateCommand extends Command<UserUpdateCommandData> {}

export { UserUpdateCommand };

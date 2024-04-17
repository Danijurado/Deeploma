import { Id, Command } from '~shared/domain';

type SessionCreateCommandData = {
  userId: Id;
  email: string;
};

class SessionCreateCommand extends Command<SessionCreateCommandData> {}

export { SessionCreateCommand };

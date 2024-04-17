import { Command, Id } from '~shared/domain';

type InstructorCreateCommandData = {
  userId: Id;
  name: string;
  profession: string;
  description: string;
  photo?: string;
};

class InstructorCreateCommand extends Command<InstructorCreateCommandData> {}

export { InstructorCreateCommand };

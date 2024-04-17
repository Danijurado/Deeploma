import { Command, Id } from '~shared/domain';

type InstructorUpdateCommandData = {
  id: Id;
  userId: Id;
  name: string;
  profession: string;
  description: string;
  photo?: string;
};

class InstructorUpdateCommand extends Command<InstructorUpdateCommandData> {}

export { InstructorUpdateCommand };

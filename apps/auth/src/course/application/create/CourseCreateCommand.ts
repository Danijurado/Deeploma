import { Command, Id } from '~shared/domain';

type CourseCreateCommandData = {
  title: string;
  subtitle: string;
  description: string;
  instructorId: Id;
  resource: string;
  resourceThumbnail: string;
};

class CourseCreateCommand extends Command<CourseCreateCommandData> {}

export { CourseCreateCommand };

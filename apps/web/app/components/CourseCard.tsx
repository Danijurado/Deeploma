import { Card, Text } from '@globero/ui/components';
import { Course } from '../context/course/Course';
import { Instructor } from '../context/instructor/Instructor';

type CourseCardProps = {
  course: Course;
  instructor?: Instructor;
};

const CourseCard = ({ course, instructor }: CourseCardProps) => {
  return (
    <Card imgSrc={course.resourceThumbnail} className="h-full min-w-full">
      <div className="flex flex-1 flex-col justify-between">
        <Text.Subtitle as="h5" size="l">
          {course.title}
        </Text.Subtitle>
        <Text.Small>{instructor?.name}</Text.Small>
      </div>
    </Card>
  );
};

export { CourseCard };

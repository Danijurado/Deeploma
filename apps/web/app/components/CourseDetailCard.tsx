import { Card } from '@globero/ui/components';
import { Course } from '../context/course/Course';

type CourseCardProps = {
  course: Course;
};

const CourseDetailCard = ({ course }: CourseCardProps) => {
  return (
    <Card imgSrc={course.resourceThumbnail} className="h-full min-w-full">
      <div className="flex flex-1 flex-col justify-between">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {course.title}
        </h5>
        <h6>{course.subtitle}</h6>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {course.description}
        </span>
      </div>
    </Card>
  );
};

export { CourseDetailCard };

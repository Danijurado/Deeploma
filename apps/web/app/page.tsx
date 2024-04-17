import Link from 'next/link';
import { readCourses } from './context/course/read';
import { Instructor } from './context/instructor/Instructor';
import { readInstructor } from './context/instructor/read';
import { CourseCard } from './components/CourseCard';
import { Hero } from './components/Hero';
import { Banner, Text } from '@globero/ui/components';
import { getSession } from './context/session/read';
import { getUser } from './context/user/read';
import { RightArrow } from '@globero/ui/icons';
import { Role } from './context/user/Role';

export default async function Page(): Promise<JSX.Element> {
  const session = await getSession();
  const user = await getUser(session?.userId);

  const courses = await readCourses();
  const instructors = {} as Record<string, Instructor>;

  for (const course of courses) {
    const instructor = await readInstructor(course.instructorId);

    if (instructor) {
      instructors[instructor.id] = instructor;
    }
  }

  return (
    <>
      {[Role.instructor, Role.admin].includes(user?.role || Role.default) && (
        <Banner>
          <Link href="/instructors" className="flex items-center">
            <Text>Gestionar perfil</Text>
            <RightArrow />
          </Link>
        </Banner>
      )}
      <Hero session={session} />
      <section className="container mx-auto px-4 py-8">
        <Text.Subtitle>Aprende las mejores prácticas</Text.Subtitle>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => {
            return (
              <li key={course.id}>
                <Link href={`/courses/${course.url}`}>
                  <CourseCard
                    course={course}
                    instructor={instructors[course.instructorId]}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

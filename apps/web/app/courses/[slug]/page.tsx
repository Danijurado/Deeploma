import dynamic from 'next/dynamic';
import { readCourse } from '../../context/course/read';
import { readInstructor } from '../../context/instructor/read';
import { Avatar, Button, Card, Text } from '@globero/ui/components';
import Link from 'next/link';
import { Metadata } from 'next';

const Content = dynamic(() => import('./Content'), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const course = await readCourse(params.slug);

  return {
    title: course.title,
    description: course.subtitle,
    openGraph: {
      images: [course.resourceThumbnail],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const course = await readCourse(params.slug);
  const instructor = await readInstructor(course.instructorId)!;
  return (
    <>
      <div className=" bg-gradient-to-br from-orange-400 to-pink-500 text-white">
        <div className="container mx-auto grid px-8 py-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <Text.Title className="text-white">{course.title}</Text.Title>
            <Text.Paragraph className="font-bold text-white">
              {course.subtitle}
            </Text.Paragraph>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid gap-4 p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <h3 className="text-2xl font-bold">Lo que aprenderas</h3>
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </Card>
          {course.resource ? (
            <div className="mt-4 overflow-hidden rounded-lg">
              <Content src={course.resource} />
            </div>
          ) : (
            <div className="relative mt-4 min-h-52 overflow-hidden rounded-lg">
              <Card className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform text-center">
                <Text.Paragraph>
                  Registrate para ver el contenido
                </Text.Paragraph>
                <Link className="flex justify-center" href="/login">
                  <Button>Comenzar</Button>
                </Link>
              </Card>
              <img
                src={course.resourceThumbnail}
                className="aspect-video blur-2xl"
                alt=""
              />
            </div>
          )}
        </div>
        <div className="md:-mt-24 ">
          <Card className="md:sticky md:top-24">
            <div className="flex flex-col items-center">
              <Avatar className="mb-4" imgSrc={instructor!.photo} />
              <h3 className="text-2xl font-bold">{instructor!.name}</h3>
              <span>{instructor!.profession}</span>
            </div>
            <p className="text-justify">{instructor!.description}</p>
          </Card>
        </div>
      </div>
    </>
  );
}

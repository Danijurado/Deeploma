import dynamic from 'next/dynamic';
import { getInstructor } from '../context/instructor/read';
import { getSession } from '../context/session/read';
import { getUser } from '../context/user/read';
import { Card } from '@globero/ui/components';

const Content = dynamic(() => import('./Content'), { ssr: false });

const Page: React.FC = async () => {
  const session = await getSession();
  const user = await getUser(session?.userId);
  const instructor = await getInstructor(user?.instructorId);

  return (
    <>
      <div className=" bg-gradient-to-br from-orange-400 to-pink-500 text-white">
        <div className="container mx-auto grid px-8 py-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-2 inline-block w-full text-4xl font-bold ">
              Gestiona tu perfil
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid gap-4 p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <Content instructor={instructor} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;

import { redirect } from 'next/navigation';
import { getSession } from '../context/session/read';
import { Content } from './Content';

const Page: React.FC = async () => {
  const session = await getSession();

  if (session) {
    return redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[32rem]">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Page;

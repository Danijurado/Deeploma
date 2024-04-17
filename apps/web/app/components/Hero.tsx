import { Button, Text } from '@globero/ui/components';
import Link from 'next/link';
import { Session } from '../context/session/Session';

type HeroProps = {
  session?: Session;
};

export const Hero = ({ session }: HeroProps) => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <Text.Title>Mejora tus competencias en RRHH</Text.Title>
        <Text.Paragraph>
          Ponte al día de las nuevas tendencias gracias al contenido actualizado
          creado por profesionales del sector.
        </Text.Paragraph>
        {!session && (
          <div className="mb-8 flex justify-center space-y-4 sm:space-x-4 sm:space-y-0 lg:mb-16">
            <Link href="/login">
              <Button type="button">Comenzar</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

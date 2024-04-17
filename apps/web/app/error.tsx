'use client';

import Image from 'next/image';
import { Text, Button } from '@globero/ui/components';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-8 w-full md:w-[32rem]">
          <Image
            src="/error.svg"
            width={500}
            height={500}
            alt="Server error image"
          />
        </div>
        <Text.Title>Esto es un poco embarazoso</Text.Title>
        <Text.Paragraph>
          A veces se soluciona dándole otra oportunidad. Si no es el caso,
          nuestros mejores ingenieros ya están trabajando para solucionar este
          problema.
        </Text.Paragraph>
        <Button onClick={() => reset()}>Probar de nuevo🤞</Button>
      </div>
    </div>
  );
}

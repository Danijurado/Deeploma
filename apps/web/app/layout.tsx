import './css/globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from './components/Navbar';
import { Footer } from '@globero/ui/components';
import { getSession } from './context/session/read';
import { QueryProvider } from './providers/QueryProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deeploma',
  description:
    'Ponte al día de las nuevas tendencias gracias al contenido actualizado creado por profesionales del sector',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <Navbar session={session} />
          <main>{children}</main>
          <Footer>
            <div className="mx-auto flex w-full items-center justify-between">
              <span>© 2024 Deeploma</span>
            </div>
          </Footer>
        </body>
      </html>
    </QueryProvider>
  );
}

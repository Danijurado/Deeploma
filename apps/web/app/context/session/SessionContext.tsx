import { createContext } from 'react';
import { readSession } from './read';
import type { Session } from './Session';
import { useQuery } from '@tanstack/react-query';

type Props = {
  children?: React.ReactNode;
};

export const SessionContext = createContext<{
  isLoading?: boolean;
  session?: Session;
}>({});

const SessionProvider: React.FC<Props> = ({ children }) => {
  const { isLoading, data: session } = useQuery({
    queryKey: ['session'],
    queryFn: readSession,
    retry: false,
    refetchOnWindowFocus: 'always',
  });

  return (
    <SessionContext.Provider value={{ isLoading, session }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider };

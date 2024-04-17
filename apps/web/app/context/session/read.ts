'use server';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { config } from '../../Config';
import type { Session } from './Session';

export const readSession = async (): Promise<Session | undefined> => {
  const cookieStore = cookies();

  const res = await fetch(`${config.INTERNAL_API_URL}/sessions/verify`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieStore.toString(),
    },
  });

  if (res.ok) {
    return res.json();
  }
};

export const getSession = cache(readSession);

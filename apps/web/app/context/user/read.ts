'use server';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { config } from '../../Config';
import type { User } from './User';

export const readUser = async (userId?: string): Promise<User | undefined> => {
  if (!userId) {
    return;
  }
  const cookieStore = cookies();

  const res = await fetch(`${config.INTERNAL_API_URL}/users/${userId}`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getUser = cache(readUser);

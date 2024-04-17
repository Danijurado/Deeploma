'use server';
import { cache } from 'react';
import { Instructor } from './Instructor';
import { config } from '../../Config';

export const readInstructor = async (
  instructorId?: string,
): Promise<Instructor | undefined> => {
  if (!instructorId) {
    return;
  }
  const res = await fetch(
    `${config.INTERNAL_API_URL}/instructors/${instructorId}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getInstructor = cache(readInstructor);

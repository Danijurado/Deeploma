'use server';
import { Course } from './Course';
import { config } from '../../Config';
import { cookies } from 'next/headers';

export const readCourses = async (): Promise<Course[]> => {
  const res = await fetch(`${config.INTERNAL_API_URL}/courses`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const readCourse = async (slug: string): Promise<Course> => {
  const cookieStore = cookies();
  const res = await fetch(`${config.INTERNAL_API_URL}/courses/${slug}`, {
    cache: 'no-store',
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

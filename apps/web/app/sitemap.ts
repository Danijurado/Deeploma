import { MetadataRoute } from 'next';
import { readCourses } from './context/course/read';

type SitemapItem = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await readCourses();

  const sites = courses.map(
    (course) =>
      ({
        url: `https://deeploma.me/courses/${course.url}`,
        priority: 1,
        changeFrequency: 'weekly',
      }) as SitemapItem,
  );

  return [
    {
      url: 'https://deeploma.me',
      changeFrequency: 'daily',
      priority: 1,
    },
    ...sites,
  ];
}

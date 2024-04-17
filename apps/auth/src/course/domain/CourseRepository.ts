import { Course } from './Course';

export const CourseRepository = Symbol('CourseRepository');

export interface CourseRepository {
  save(course: Course): Promise<void>;
  readById(id: string): Promise<Course>;
  readByUrl(url: string): Promise<Course>;
  read(): Promise<Course[]>;
}

import { Id } from '~shared/domain';
import { Instructor } from './Instructor';

export const InstructorRepository = Symbol('instructorRepository');

export interface InstructorRepository {
  save(instructor: Instructor): Promise<void>;
  update(instructor: Instructor): Promise<void>;
  readById(id: string): Promise<Instructor>;
  readByUserId(userId: Id): Promise<Instructor>;
}

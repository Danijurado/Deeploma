import { User } from './User';

export const UserRepository = Symbol('UserRepository');

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  read(email: string): Promise<User>;
  readById(id: string): Promise<User>;
}

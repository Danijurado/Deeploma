import type { Role } from './Role';

export type User = {
  id: string;
  email: string;
  role: Role;
  instructorId: string;
};

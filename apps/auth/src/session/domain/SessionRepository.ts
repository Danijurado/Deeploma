import { Session } from './Session';

export const SessionRepository = Symbol('SessionRepository');

export interface SessionRepository {
  save(session: Session): Promise<void>;
  readByLinkToken(linkToken: string): Promise<Session | undefined>;
}

import { createHash, randomBytes } from 'node:crypto';

import { AggregateRoot, Id } from '~shared/domain';
import { SessionCreatedEvent } from '~session/domain/SessionCreatedEvent';

class Session extends AggregateRoot {
  constructor(
    public id: Id,
    public userId: Id,
    public linkToken?: string,
  ) {
    super();
  }

  static create(id: Id, userId: Id): Session {
    const session = new Session(id, userId);

    session.record(
      new SessionCreatedEvent(id, {
        userId: session.userId.value,
      }),
    );

    return session;
  }

  generateLinkToken(): string {
    const token = randomBytes(16).toString('hex');

    this.linkToken = createHash('sha256').update(token).digest('hex');

    return token;
  }
}

export { Session };

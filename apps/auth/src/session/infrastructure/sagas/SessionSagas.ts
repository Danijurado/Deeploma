import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { SessionCreateCommand } from '~session/application';
import { Event, Id } from '~shared/domain';

type UserRegisteredEventData = {
  email: string;
};

@Injectable()
class SessionSagas {
  @Saga()
  userRegisteredEventListener = (
    events: Observable<Event>,
  ): Observable<SessionCreateCommand> => {
    return events.pipe(
      filter((event) => {
        return event.topic === 'user.registered';
      }),
      map((event) => {
        const { aggregateRootId: userId, data } = event;
        const { email } = data as UserRegisteredEventData;

        return new SessionCreateCommand({
          userId: new Id(userId),
          email,
        });
      }),
    );
  };
}

export { SessionSagas };

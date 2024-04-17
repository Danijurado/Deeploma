import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { Event, Id } from '~shared/domain';
import { UserUpdateCommand } from '~user/application/update/UserUpdateCommand';

type InstructorCreatedEventData = {
  userId: string;
};

@Injectable()
class UserSagas {
  @Saga()
  instructorCreatedEventListener = (
    events: Observable<Event>,
  ): Observable<UserUpdateCommand> => {
    return events.pipe(
      filter((event) => {
        return event.topic === 'instructor.created';
      }),
      map((event) => {
        const { aggregateRootId: instructorId, data } = event;
        const { userId } = data as InstructorCreatedEventData;

        return new UserUpdateCommand({
          id: new Id(userId),
          instructorId: new Id(instructorId),
        });
      }),
    );
  };
}

export { UserSagas };

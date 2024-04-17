import { Event } from '~shared/domain';

abstract class AggregateRoot {
  protected events: Event[] = [];

  pullDomainEvents(): Event[] {
    const events = this.events;

    this.events = [];

    return events;
  }

  record(event: Event): void {
    this.events.push(event);
  }
}

export { AggregateRoot };

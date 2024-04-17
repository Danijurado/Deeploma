import { Id } from '~shared/domain';

abstract class Event<T = unknown> {
  public id: string;

  constructor(
    public topic: string,
    public aggregateRootId: string,
    public data: T,
  ) {
    this.id = Id.generate().value;
  }
}

export { Event };

import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';
import { EventRepository, Event } from '~shared/domain';

@Injectable()
class StoreEventHandler {
  private destroy = new Subject<void>();
  private readonly logger = new Logger(StoreEventHandler.name);

  constructor(
    @Inject(EventRepository) private repository: EventRepository,
    private eventBus: EventBus,
  ) {
    this.eventBus.pipe(takeUntil(this.destroy)).subscribe((event) => {
      this.logger.debug(JSON.stringify(event));
      this.repository.save(event as Event);
    });
  }

  onModuleDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}

export { StoreEventHandler };

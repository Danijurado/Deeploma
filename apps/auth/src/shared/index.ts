import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Event, EventRepository } from '~shared/domain';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventSchema,
  EventMongoRepository,
} from '~shared/infrastructure/event';
import { StoreEventHandler } from '~shared/application';
import { ConfigModule } from '@nestjs/config';
import { NotificationSender } from './infrastructure/NotificationSender';
import { Notification } from './domain/Notification';

const EventRepositoryProvider = {
  provide: EventRepository,
  useClass: EventMongoRepository,
};

const NotificationProvider = {
  provide: Notification,
  useClass: NotificationSender,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  providers: [EventRepositoryProvider, StoreEventHandler, NotificationProvider],
  exports: [CqrsModule, ConfigModule, NotificationProvider],
})
export class SharedModule {}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Event, EventRepository } from '~shared/domain';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
class EventMongoRepository implements EventRepository {
  constructor(@InjectModel(Event.name) private schema: Model<Event>) {}

  async save(event: Event<unknown>): Promise<void> {
    const { id: _id, ...properties } = event;

    await new this.schema({
      _id,
      ...properties,
    }).save();
  }
}

export { EventMongoRepository };

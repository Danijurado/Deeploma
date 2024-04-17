import { Event } from './Event';

export const EventRepository = Symbol('EventRepository');

export interface EventRepository {
  save(event: Event): Promise<void>;
}

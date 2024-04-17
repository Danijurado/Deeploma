import { Exclude } from 'class-transformer';

export abstract class Serializer {
  @Exclude()
  events: any[] = [];
}

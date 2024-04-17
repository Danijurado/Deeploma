import { AggregateRoot, Id } from '~shared/domain';
import { InstructorCreatedEvent } from './InstructorCreatedEvent';
import { InstructorUpdatedEvent } from './InstructorUpdatedEvent';

class Instructor extends AggregateRoot {
  constructor(
    public id: Id,
    public userId: Id,
    public name: string,
    public profession: string,
    public description: string,
    public photo?: string,
  ) {
    super();
  }

  static create(
    id: Id,
    userId: Id,
    name: string,
    profession: string,
    description: string,
    photo?: string,
  ): Instructor {
    const instructor = new Instructor(
      id,
      userId,
      name,
      profession,
      description,
      photo,
    );

    instructor.record(
      new InstructorCreatedEvent(id, {
        userId: instructor.userId.value,
        name: instructor.name,
        profession: instructor.profession,
        photo: instructor.photo,
        description: instructor.description,
      }),
    );
    return instructor;
  }

  update(
    name: string,
    profession: string,
    description: string,
    photo?: string,
  ): void {
    this.name = name;
    this.profession = profession;
    this.photo = photo;
    this.description = description;

    this.record(
      new InstructorUpdatedEvent(this.id, {
        name: this.name,
        profession: this.profession,
        photo: this.photo,
        description: this.description,
      }),
    );
  }
}

export { Instructor };

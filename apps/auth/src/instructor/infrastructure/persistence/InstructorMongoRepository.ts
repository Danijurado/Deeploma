import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Id } from '~shared/domain';
import { InstructorRepository } from '../../domain/InstructorRepository';
import { Instructor } from '../../domain/Instructor';

type InstructorDocument = Document<string> & Instructor;

@Injectable()
class InstructorMongoRepository implements InstructorRepository {
  constructor(
    @InjectModel(Instructor.name) private schema: Model<Instructor>,
  ) {}

  async save(instructor: Instructor): Promise<void> {
    const { id, userId, name, profession, photo, description } = instructor;

    await new this.schema({
      _id: id.value,
      userId: userId.value,
      name,
      profession,
      photo,
      description,
    }).save();
  }

  async update(instructor: Instructor): Promise<void> {
    const { id, userId, ...rest } = instructor;

    await this.schema.updateOne(
      { _id: id.value },
      { userId: userId.value, ...rest },
    );
  }

  async readByUserId(userId: Id): Promise<Instructor | undefined> {
    const response = await this.schema.findOne<InstructorDocument>({
      userId: userId.value,
    });

    return this.factory(response);
  }

  async readById(id: string): Promise<Instructor | undefined> {
    const response = await this.schema.findById<InstructorDocument>(id);

    return this.factory(response);
  }

  private factory(document: InstructorDocument): Instructor | undefined {
    if (document) {
      return new Instructor(
        new Id(document._id as unknown as string),
        new Id(document.userId as unknown as string),
        document.name,
        document.profession,
        document.description,
        document.photo,
      );
    }
  }
}

export { InstructorMongoRepository };

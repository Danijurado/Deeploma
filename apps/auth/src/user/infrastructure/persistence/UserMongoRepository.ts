import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Role, User, UserRepository } from '~user/domain';
import { InjectModel } from '@nestjs/mongoose';
import { Id } from '~shared/domain';

type UserDocument = Document<string> & {
  email: string;
  role: string;
  instructorId: string;
};

@Injectable()
class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private schema: Model<User>) {}

  async save(user: User): Promise<void> {
    const { id, email, role } = user;

    await new this.schema({
      _id: id.value,
      email,
      role,
    }).save();
  }

  async update(user: User): Promise<void> {
    const { id, instructorId } = user;

    await this.schema.updateOne(
      { _id: id.value },
      { instructorId: instructorId?.value },
    );
  }

  async read(email: string): Promise<User | undefined> {
    const response = await this.schema.findOne<UserDocument>({ email });

    return this.factory(response);
  }

  async readById(id: string): Promise<User | undefined> {
    const response = await this.schema.findById<UserDocument>(id);

    return this.factory(response);
  }

  private factory(document: UserDocument): User | undefined {
    if (!document) {
      return;
    }

    return new User(
      new Id(document.id),
      document.email,
      Role[document.role],
      document.instructorId ? new Id(document.instructorId) : undefined,
    );
  }
}

export { UserMongoRepository };

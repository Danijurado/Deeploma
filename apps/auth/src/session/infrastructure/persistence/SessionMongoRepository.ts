import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '~session/domain';
import { SessionRepository } from '~session/domain/SessionRepository';
import { Id } from '~shared/domain';

@Injectable()
class SessionMongoRepository implements SessionRepository {
  constructor(@InjectModel(Session.name) private schema: Model<Session>) {}

  async save(session: Session): Promise<void> {
    const { id, userId, linkToken } = session;

    await new this.schema({
      _id: id.value,
      userId: userId.value,
      linkToken,
    }).save();
  }

  async readByLinkToken(linkToken: string): Promise<Session | undefined> {
    const response = await this.schema.findOne({ linkToken });

    if (!response) {
      return;
    }

    return new Session(
      new Id(response._id as unknown as string),
      response.userId,
      response.linkToken,
    );
  }
}

export { SessionMongoRepository };

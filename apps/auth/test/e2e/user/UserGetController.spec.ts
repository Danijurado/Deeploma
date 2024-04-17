import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import mongoose from 'mongoose';

import { Types, Collection, Mongoose, Document } from 'mongoose';
import { AppModule } from '../../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../Environment';

type UserDocument = Document<string> & { email: string; role: string };

const defaultUser = {
  _id: new Types.ObjectId().toHexString(),
  email: 'test@domain.com',
  role: 'default',
};

const adminUser = {
  _id: new Types.ObjectId().toHexString(),
  email: 'admin@domain.com',
  role: 'admin',
};

describe('UserGetController', () => {
  let mongo: StartedMongoDBContainer;
  let app: INestApplication;
  let env: Environment;

  let conn: Mongoose;
  let collection: Collection<UserDocument>;

  beforeAll(async () => {
    mongo = await new MongoDBContainer().start();
    env = new Environment(mongo.getMappedPort(27017));

    conn = await mongoose.connect(env.get('MONGO_URL'));

    collection = conn.connection.collection('users');

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(env)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await conn.connection.close();
    await mongo.stop();
    await app.close();
  });

  describe('GET /user', () => {
    beforeAll(async () => {
      await collection.insertOne(defaultUser as UserDocument);
    });

    describe('when request user is not admin', () => {
      it('should return 401', async () => {
        return request(app.getHttpServer())
          .get(`/users/${defaultUser._id}`)
          .expect(401);
      });
    });

    describe('when request user admin', () => {
      beforeAll(async () => {
        await collection.insertOne(adminUser as UserDocument);
      });

      it('should return 401', async () => {
        const token = jwt.sign(
          { userId: adminUser._id },
          env.get('JWT_SECRET'),
        );

        return request(app.getHttpServer())
          .get(`/users/${defaultUser._id}`)
          .auth(token, { type: 'bearer' })
          .expect(200)
          .expect({
            id: defaultUser._id,
            email: 'test@domain.com',
            role: 'default',
          });
      });
    });
  });
});

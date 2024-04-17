import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { AppModule } from '../../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../Environment';
import { EventBus } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';

describe('UserPostController', () => {
  let mongo: StartedMongoDBContainer;
  let app: INestApplication;
  let env: Environment;

  beforeAll(async () => {
    mongo = await new MongoDBContainer().start();
    env = new Environment(mongo.getMappedPort(27017));

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(env)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await mongo.stop();
    await app.close();
  });

  describe('POST /user', () => {
    describe('when request body is not completed', () => {
      it('should return 400', async () => {
        return request(app.getHttpServer())
          .post('/users/')
          .send({})
          .expect(400);
      });
    });

    describe('when request body is completed', () => {
      const destroy$ = new Subject<void>();

      afterAll(() => {
        destroy$.next();
        destroy$.complete();
      });

      it('should return 201', async () => {
        const email = 'user@domain.com';

        await request(app.getHttpServer())
          .post('/users/')
          .send({
            email,
          })
          .expect(201);

        const eventBus = app.get(EventBus);

        // Using CQRS command, out of the request scope
        const getUserCreatedEvent = new Promise((resolve) => {
          eventBus.pipe(takeUntil(destroy$)).subscribe(resolve);
        });

        await expect(getUserCreatedEvent).resolves.toMatchObject({
          topic: 'user.created',
          data: { email },
        });
      });
    });
  });
});

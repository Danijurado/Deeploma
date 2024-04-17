import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SessionSagas } from '~session/infrastructure';
import { SessionCreateCommandHandler } from '~session/application';
import { SharedModule } from '~shared';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './infrastructure/persistence/SessionSchema';
import { SessionRepository } from './domain/SessionRepository';
import { SessionMongoRepository } from './infrastructure/persistence/SessionMongoRepository';
import { Session } from './domain/Session';
import { SessionGetController } from './infrastructure/network/SessionGetController';
import { SessionReadQueryByLinkTokenHandler } from './application/read/SessionReadByLinkTokenQueryHandler';
import { SessionMiddleware } from './infrastructure/network/SessionMiddleware';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './infrastructure/network/SessionGuard';
import { SessionDeleteControler } from './infrastructure/network/SessionDeleteController';

const SessionsRepositoryProvider = {
  provide: SessionRepository,
  useClass: SessionMongoRepository,
};

const SessionGuardProvider = {
  provide: APP_GUARD,
  useClass: SessionGuard,
};

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [SessionGetController, SessionDeleteControler],
  providers: [
    SessionReadQueryByLinkTokenHandler,
    SessionSagas,
    SessionCreateCommandHandler,
    SessionsRepositoryProvider,
    SessionGuardProvider,
  ],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}

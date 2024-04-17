import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCreateCommandHandler } from '~user/application';
import { SharedModule } from '~shared';
import { User, UserRepository } from '~user/domain';
import { UserSchema, UserMongoRepository } from '~user/infrastructure';
import { UserPostController } from './infrastructure/network/UserPostController';
import { UserGetController } from './infrastructure/network/UserGetController';
import { UserReadQueryByIdHandler } from './application/read/UserReadByIdQueryHandler';
import { UserGuard } from './infrastructure/network/UserGuard';
import { APP_GUARD } from '@nestjs/core';
import { UserUpdateCommandHandler } from './application/update/UserUpdateCommandHandler';
import { UserSagas } from './infrastructure/sagas/UserSagas';
import { UserMiddleware } from './infrastructure/network/UserMiddleware';

const UserGuardProvider = {
  provide: APP_GUARD,
  useClass: UserGuard,
};

const UserRepositoryProvider = {
  provide: UserRepository,
  useClass: UserMongoRepository,
};

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserPostController, UserGetController],
  providers: [
    UserSagas,
    UserReadQueryByIdHandler,
    UserCreateCommandHandler,
    UserUpdateCommandHandler,
    UserRepositoryProvider,
    UserGuardProvider,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '~shared';
import { CourseRepository } from './domain/CourseRepository';
import {
  CourseMongoRepository,
  CourseSchema,
} from './infrastructure/persistence';
import { Course } from './domain/Course';
import { CourseGetController } from './infrastructure/network/CourseGetController';
import { CourseReadQueryByIdHandler } from './application/read/CourseReadByIdQueryHandler';
import { CoursePostController } from './infrastructure/network/CoursePostController';
import { CourseCreateCommandHandler } from './application/create/CourseCreateCommandHandler';
import { CourseReadAllQueryHandler } from './application/read/CourseReadAllQueryHandler';
import { CourseReadQueryByUrlHandler } from './application/read/CourseReadByUrlQueryHandler';

const CourseRepositoryProvider = {
  provide: CourseRepository,
  useClass: CourseMongoRepository,
};

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [CourseGetController, CoursePostController],
  providers: [
    CourseReadQueryByIdHandler,
    CourseRepositoryProvider,
    CourseCreateCommandHandler,
    CourseReadAllQueryHandler,
    CourseReadQueryByUrlHandler,
  ],
})
export class CourseModule {}

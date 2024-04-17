import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '~shared';
import { Instructor, InstructorRepository } from './domain';
import {
  InstructorMongoRepository,
  InstructorSchema,
} from './infrastructure/persistence';
import { InstructorReadQueryByIdHandler } from './application/read/InstructorReadByIdQueryHandler';
import { InstructorCreateCommandHandler } from './application/create';
import { InstructorGetController } from './infrastructure/network/InstructorGetController';
import { InstructorPostController } from './infrastructure/network/InstructorPostController';
import { InstructorPutController } from './infrastructure/network/InstructorPutController';
import { InstructorUpdateCommandHandler } from './application/update/InstructorUpdateCommandHandler';
import { InstructorReadQueryByUserIdHandler } from './application/read/InstructorReadByUserIdQueryHandler';

const InstructorRepositoryProvider = {
  provide: InstructorRepository,
  useClass: InstructorMongoRepository,
};

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: Instructor.name,
        schema: InstructorSchema,
      },
    ]),
  ],
  controllers: [
    InstructorGetController,
    InstructorPostController,
    InstructorPutController,
  ],
  providers: [
    InstructorReadQueryByIdHandler,
    InstructorCreateCommandHandler,
    InstructorRepositoryProvider,
    InstructorUpdateCommandHandler,
    InstructorReadQueryByUserIdHandler,
  ],
})
export class InstructorModule {}

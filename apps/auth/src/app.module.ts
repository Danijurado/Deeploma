import mongoose from 'mongoose';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CourseModule } from './course';
import { SessionModule } from '~session';
import { UserModule } from '~user';
import { InstructorModule } from './instructor';
import { FileModule } from './file';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('APP_ENV') === 'production';

        if (!isProduction) {
          const logger = new Logger('mongoose');
          mongoose.set('debug', (collectionName, method, query) => {
            const log = {
              method: `${collectionName}.${method}`,
              query,
            };
            logger.debug(JSON.stringify(log));
          });
        }

        return {
          uri: configService.get('MONGO_URL'),
        };
      },
      inject: [ConfigService],
    }),
    FileModule,
    SessionModule,
    UserModule,
    CourseModule,
    InstructorModule,
  ],
})
export class AppModule {}

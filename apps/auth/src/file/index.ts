import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SharedModule } from '~shared';
import * as multerS3 from 'multer-s3';
import { FilePostController } from './infrastructure/network/FilePostController';

import { Request } from '~shared/infrastructure/network/Request';
import { Id } from '~shared/domain';
import { extname } from 'node:path';

@Module({
  imports: [
    SharedModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('APP_ENV') === 'production';
        const config = {
          region: configService.get('AWS_REGION'),
        };

        if (!isProduction) {
          config['endpoint'] = configService.get('AWS_ENDPOINT');
        }

        const s3 = new S3Client(config);

        const storage = multerS3({
          s3: s3,
          bucket: configService.get('S3_BUCKET_NAME'),
          key: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error, id: string) => void,
          ) {
            const { userId } = req.session;

            cb(
              null,
              `${userId}/${Id.generate().value}${extname(file.originalname)}`,
            );
          },
        });

        return { storage };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [FilePostController],
  providers: [],
})
export class FileModule {}

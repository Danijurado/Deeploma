import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authenticated } from '~shared/infrastructure/network/Authenticated';
import { Authorized } from '~shared/infrastructure/network/Authorized';

@Controller('files')
class FilePostController {
  @Authorized(['instructor'])
  @Authenticated()
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async register(@UploadedFile() file: Express.Multer.File & { key: string }) {
    return { key: file.key };
  }
}

export { FilePostController };

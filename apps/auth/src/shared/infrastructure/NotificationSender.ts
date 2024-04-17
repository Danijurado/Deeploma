import { ConfigService } from '@nestjs/config';
import { EmailOptions, Notification } from '../domain/Notification';
import * as sg from '@sendgrid/mail';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class NotificationSender implements Notification {
  private readonly logger = new Logger(NotificationSender.name);
  constructor(private configService: ConfigService) {
    sg.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }
  async email(options: EmailOptions) {
    try {
      const isProduction = this.configService.get('APP_ENV') === 'production';
      if (isProduction) {
        await sg.send(options);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}

export { NotificationSender };

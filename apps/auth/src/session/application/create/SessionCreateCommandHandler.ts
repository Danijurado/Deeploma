import { Inject, Logger } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Session } from '~session/domain';
import { SessionCreateCommand } from './SessionCreateCommand';
import { Id } from '~shared/domain';
import { SessionRepository } from '~session/domain/SessionRepository';
import { Notification } from '~shared/domain/Notification';
import { Eta } from 'eta';
import { join } from 'node:path';

const eta = new Eta({ views: join(__dirname, '../templates') });

@CommandHandler(SessionCreateCommand)
class SessionCreateCommandHandler
  implements ICommandHandler<SessionCreateCommand>
{
  private readonly logger = new Logger(SessionCreateCommandHandler.name);
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(SessionRepository) private repository: SessionRepository,
    @Inject(Notification) private notification: Notification,
  ) {}

  async execute(command: SessionCreateCommand): Promise<void> {
    const {
      data: { userId, email },
    } = command;
    const session = Session.create(Id.generate(), userId);
    const linkToken = session.generateLinkToken();

    await this.repository.save(session);

    this.sendNotification(linkToken, email);

    await this.bus.publishAll(session.pullDomainEvents());
  }

  private async sendNotification(linkToken: string, email: string) {
    this.logger.debug(`http://localhost:4000/sessions?linkToken=${linkToken}`);

    const href = `https://api.deeploma.me/sessions?linkToken=${linkToken}`;
    const html = eta.render('./email', { href });

    this.notification.email({
      to: email,
      from: 'info@deeploma.me',
      subject: 'Tu enlace para iniciar sesión',
      html,
    });
  }
}

export { SessionCreateCommandHandler };

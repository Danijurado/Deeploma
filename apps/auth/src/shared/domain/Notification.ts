export const Notification = Symbol('Notification');

export type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export interface Notification {
  email(options: EmailOptions);
}

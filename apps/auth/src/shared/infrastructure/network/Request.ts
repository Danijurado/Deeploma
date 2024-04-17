import { Request as BaseRequest } from 'express';

export type Request = BaseRequest & {
  session: {
    id: string;
    userId: string;
  };
  user: {
    id: string;
    email: string;
    role: string;
    instructorId: string;
  };
};

import { Reflector } from '@nestjs/core';

export const Authorized = Reflector.createDecorator<string[]>();

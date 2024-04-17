import { Query } from '~shared/domain';

class SessionReadByLinkTokenQuery implements Query {
  constructor(public readonly linkToken: string) {}
}

export { SessionReadByLinkTokenQuery };

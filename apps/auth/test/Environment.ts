export class Environment {
  env: Record<string, string> = {
    JWT_SECRET: 'secret',
    PORT: '4000',
    S3_BUCKET_NAME: 'test',
  };

  constructor(port: number) {
    this.env.MONGO_URL = `mongodb://localhost:${port}/test?directConnection=true`;
  }

  get(key: string) {
    return this.env[key];
  }
}

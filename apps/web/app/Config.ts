class Config {
  public readonly INTERNAL_API_URL = process.env.API_URL;
  public readonly PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
}

export const config = new Config();

import { Types } from 'mongoose';

class Id {
  public value: string;

  constructor(value: string) {
    const isValid = Types.ObjectId.isValid(value);

    if (!isValid) {
      throw new Error('Invalid ObjectId');
    }

    this.value = value;
  }

  static generate(): Id {
    return new Id(new Types.ObjectId().toHexString());
  }
}

export { Id };

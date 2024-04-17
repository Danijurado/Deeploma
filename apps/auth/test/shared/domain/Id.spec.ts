import { Id } from '~shared/domain';
import { Types } from 'mongoose';

describe('Id', () => {
  describe('contructor', () => {
    describe('when value is a valid mongo id', () => {
      it('generates a Id instance', () => {
        const hex = new Types.ObjectId().toHexString();
        const id = new Id(hex);

        expect(id).toBeInstanceOf(Id);
      });
    });

    describe('when value is a invalid mongo id', () => {
      it('throws an error', () => {
        expect(() => new Id('')).toThrow('Invalid ObjectId');
      });
    });
  });

  describe('generate', () => {
    it('generetes a Id instance', () => {
      expect(Id.generate()).toBeInstanceOf(Id);
    });
  });
});

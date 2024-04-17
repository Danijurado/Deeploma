import { Spinner as S } from 'flowbite-react';

type SpinnerProps = {
  size?: 'sm';
  className?: string;
};

export const Spinner = ({ size = 'sm', className }: SpinnerProps) => (
  <S
    size={size}
    color="primary"
    className={className}
    theme={{
      color: {
        primary: 'fill-white',
      },
    }}
  />
);

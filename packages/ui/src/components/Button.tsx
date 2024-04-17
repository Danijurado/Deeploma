import { ReactNode } from 'react';
import { Button as B } from 'flowbite-react';

type Variant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: Variant;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  children,
  className,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
}: ButtonProps) => {
  return (
    <B
      className={className || ''}
      outline={variant === 'secondary'}
      gradientDuoTone="pinkToOrange"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </B>
  );
};

import { ReactNode } from 'react';
import { Card as C } from 'flowbite-react';

type CardProps = {
  children?: ReactNode;
  className?: string;
  imgSrc?: string;
};

export const Card = ({ children, className, imgSrc }: CardProps) => {
  return (
    <C
      className={`${className || ''} overflow-hidden`}
      renderImage={
        imgSrc
          ? () => {
              return <img src={imgSrc} className="aspect-video" />;
            }
          : undefined
      }
    >
      {children}
    </C>
  );
};

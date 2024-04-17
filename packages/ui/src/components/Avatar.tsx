import { Avatar as A } from 'flowbite-react';

type AvatarProps = {
  className?: string;
  imgSrc?: string;
};

export const Avatar = ({ className, imgSrc }: AvatarProps) => {
  return <A className={`${className || ''}`} img={imgSrc} rounded size="lg" />;
};

import { ReactNode } from 'react';

type BannerProps = {
  children?: ReactNode;
};

export const Banner = ({ children }: BannerProps) => {
  return (
    <div className="top-o sticky flex justify-center bg-gradient-to-br from-orange-400 to-pink-500 py-2 text-white">
      {children}
    </div>
  );
};

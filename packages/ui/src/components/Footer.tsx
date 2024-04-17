import { ReactNode } from 'react';

type FooterProps = {
  children?: ReactNode;
};

export const Footer = ({ children }: FooterProps) => {
  return (
    <footer className="sticky top-[100vh] flex justify-center  px-2 py-8 text-black  sm:px-4">
      {children}
    </footer>
  );
};

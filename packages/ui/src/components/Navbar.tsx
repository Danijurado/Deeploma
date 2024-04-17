import { Navbar as N } from 'flowbite-react';
import { ReactNode } from 'react';

type NavbarProps = {
  children?: ReactNode;
};

type BrandProps = {
  children?: ReactNode;
};

type CollapseProps = {
  children?: ReactNode;
};

type LinkProps = {
  children?: ReactNode;
};

type NavbarComponent = React.FC<NavbarProps> & {
  Brand: React.FC<BrandProps>;
  Toggle: React.FC;
  Collapse: React.FC<CollapseProps>;
  Link: React.FC<LinkProps>;
};

export const Navbar: NavbarComponent = ({ children }) => {
  return (
    <N fluid rounded className="sticky top-0 z-50">
      {children}
    </N>
  );
};

Navbar.Brand = ({ children }) => <N.Brand href="/">{children}</N.Brand>;

Navbar.Toggle = () => <N.Toggle />;

Navbar.Collapse = ({ children }) => <N.Collapse>{children}</N.Collapse>;

Navbar.Link = ({ children }) => (
  <li
    className="block cursor-pointer border-b border-gray-100 px-3 
      py-2 text-rose-500 hover:bg-gray-50 
      md:border-0 md:hover:bg-transparent md:hover:text-pink-700"
  >
    {children}
  </li>
);

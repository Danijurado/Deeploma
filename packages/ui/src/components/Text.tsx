import { createElement } from 'react';

type TextProps = {
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';
};

type TextComponent = React.FC<TextProps> & {
  Title: React.FC<TextProps>;
  Subtitle: React.FC<TextProps>;
  Paragraph: React.FC<TextProps>;
  Small: React.FC<TextProps>;
};

const sizes = {
  xs: 'text-sm',
  s: 'text-md',
  m: 'text-lg',
  l: 'text-2xl',
  xl: 'text-3xl md:text-4xl',
  '2xl': 'text-4xl md:text-5xl',
};

export const Text: TextComponent = ({ children, as, ...props }: TextProps) => {
  return createElement(as || 'p', props, children);
};

Text.Title = ({ children, as, className, size }) => {
  const sizeClass = sizes[size || '2xl'];

  return (
    <Text
      as={as || 'h1'}
      className={`mb-8 font-extrabold leading-none tracking-tight text-gray-900 ${sizeClass} ${className || ''}`}
    >
      {children}
    </Text>
  );
};

Text.Subtitle = ({ children, as, size, className }) => {
  const sizeClass = sizes[size || 'xl'];

  return (
    <Text
      as={as || 'h3'}
      className={`mb-8 font-extrabold leading-none tracking-tight text-gray-900 ${sizeClass} ${className || ''}`}
    >
      {children}
    </Text>
  );
};

Text.Paragraph = ({ children, as, size, className }) => {
  const sizeClass = sizes[size || 'm'];

  return (
    <Text
      as={as || 'p'}
      className={`mb-4 text-gray-500 ${sizeClass} ${className || ''}`}
    >
      {children}
    </Text>
  );
};

Text.Small = ({ children, as, size, className }) => {
  const sizeClass = sizes[size || 'xs'];

  return (
    <Text
      as={as || 'span'}
      className={`text-gray-500 ${sizeClass} ${className || ''}`}
    >
      {children}
    </Text>
  );
};

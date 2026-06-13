import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
}

const Card = ({ children, className = '', as: Component = 'div' }: CardProps) => {
  return (
    <Component
      className={`rounded-xl border border-border bg-surface p-6 shadow-sm ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default Card;

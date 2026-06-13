import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
  interactive?: boolean;
}

const interactiveStyles =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md motion-reduce:transform-none motion-reduce:shadow-sm';

const Card = ({
  children,
  className = '',
  as: Component = 'div',
  interactive = false,
}: CardProps) => {
  return (
    <Component
      className={`rounded-xl border border-border bg-surface p-6 shadow-sm ${interactive ? interactiveStyles : ''} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default Card;

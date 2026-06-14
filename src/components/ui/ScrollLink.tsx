import type { ReactNode } from 'react';
import { Link } from 'react-scroll';
import { SCROLL_OFFSET } from '../../data/navbarTabs';

type ScrollLinkVariant = 'primary' | 'secondary';

const variantStyles: Record<ScrollLinkVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent',
  secondary:
    'border border-border bg-surface text-foreground hover:bg-background focus-visible:ring-accent',
};

const baseStyles =
  'inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium transition-[color,transform,background-color,border-color] active:scale-[0.98] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer';

interface ScrollLinkProps {
  to: string;
  variant?: ScrollLinkVariant;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

const ScrollLink = ({
  to,
  variant = 'primary',
  children,
  className = '',
  showArrow = false,
}: ScrollLinkProps) => {
  return (
    <Link
      to={to}
      spy
      smooth
      offset={SCROLL_OFFSET}
      duration={500}
      className={`group ${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
    >
      {children}
      {showArrow && (
        <span className="inline-block -translate-x-1 opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100">
          →
        </span>
      )}
    </Link>
  );
};

export default ScrollLink;

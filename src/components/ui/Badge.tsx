interface BadgeProps {
  children: string;
  className?: string;
  interactive?: boolean;
  title?: string;
}

const interactiveStyles =
  'cursor-default transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:-translate-y-px motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40';

const Badge = ({ children, className = '', interactive = false, title }: BadgeProps) => {
  return (
    <span
      title={title}
      tabIndex={interactive ? 0 : undefined}
      className={`inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs font-medium text-muted ${interactive ? interactiveStyles : ''} ${className}`.trim()}
    >
      {children}
    </span>
  );
};

export default Badge;

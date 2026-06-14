interface BadgeProps {
  children: string;
  className?: string;
  interactive?: boolean;
  title?: string;
}

const interactiveStyles =
  'transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-foreground hover:-translate-y-px motion-reduce:transform-none';

const Badge = ({ children, className = '', interactive = false, title }: BadgeProps) => {
  return (
    <span
      title={title}
      className={`inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs font-medium text-muted ${interactive ? interactiveStyles : ''} ${className}`.trim()}
    >
      {children}
    </span>
  );
};

export default Badge;

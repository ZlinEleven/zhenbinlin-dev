interface BadgeProps {
  children: string;
  className?: string;
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs font-medium text-muted ${className}`.trim()}
    >
      {children}
    </span>
  );
};

export default Badge;

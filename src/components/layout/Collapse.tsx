import type { ReactNode } from 'react';

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

const Collapse = ({ open, children, className = '' }: CollapseProps) => {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      } ${className}`.trim()}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

export default Collapse;

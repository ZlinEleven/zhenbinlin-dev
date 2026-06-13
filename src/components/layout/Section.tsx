import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, children, className = '' }: SectionProps) => {
  return (
    <section
      id={id}
      className={`scroll-mt-16 max-w-content mx-auto px-6 py-24 ${className}`.trim()}
    >
      <Reveal>{children}</Reveal>
    </section>
  );
};

export default Section;

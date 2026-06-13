import type { ReactNode } from 'react';
import type { SchoolTheme } from './schoolThemes';

interface SchoolCardProps {
  theme: SchoolTheme;
  children: ReactNode;
  className?: string;
}

const cardClass: Record<SchoolTheme, string> = {
  sbu: 'school-card school-card-sbu',
  gt: 'school-card school-card-gt',
};

const SchoolCard = ({ theme, children, className = '' }: SchoolCardProps) => {
  return <div className={`${cardClass[theme]} ${className}`.trim()}>{children}</div>;
};

export default SchoolCard;

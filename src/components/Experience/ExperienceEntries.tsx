import type { ReactNode } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

interface ExperienceEntriesProps {
  date: string;
  title: string;
  role: string;
  bullets: string[];
  icon: ReactNode;
}

const ExperienceEntries = ({ date, title, role, bullets, icon }: ExperienceEntriesProps) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: 'var(--color-surface)',
        color: 'var(--color-foreground)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      }}
      contentArrowStyle={{ borderRight: '7px solid var(--color-surface)' }}
      iconStyle={{ background: 'var(--color-accent)', color: '#FFFFFF' }}
      date={date}
      icon={icon}
    >
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm font-medium text-muted">{role}</p>
      <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-muted">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceEntries;

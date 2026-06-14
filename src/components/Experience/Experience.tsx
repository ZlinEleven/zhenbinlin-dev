import { useState } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { beyondWorkExperiences, primaryExperiences } from '../../data/experiences';
import { Section, SectionHeading, Collapse } from '../layout';
import { Button } from '../ui';
import ExperienceEntries from './ExperienceEntries';

const Experience = () => {
  const [showBeyondWork, setShowBeyondWork] = useState(false);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        subtitle="Production systems at Amazon, Capital One, and Angi."
      />
      <VerticalTimeline lineColor="var(--color-border)">
        {primaryExperiences.map((experience) => (
          <ExperienceEntries
            key={`${experience.title}-${experience.date}`}
            date={experience.date}
            title={experience.title}
            role={experience.role}
            bullets={experience.bullets}
            icon={experience.icon}
          />
        ))}
      </VerticalTimeline>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button variant="ghost" onClick={() => setShowBeyondWork(!showBeyondWork)} className="gap-1.5">
          {showBeyondWork ? 'Hide beyond work' : 'Show beyond work'}
          <span
            className={`transition-transform duration-300 motion-reduce:transition-none ${showBeyondWork ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            ▾
          </span>
        </Button>
        <Collapse open={showBeyondWork} className="w-full">
          <VerticalTimeline lineColor="#E5E5E5" className="w-full">
            {beyondWorkExperiences.map((experience) => (
              <ExperienceEntries
                key={`${experience.title}-${experience.date}`}
                date={experience.date}
                title={experience.title}
                role={experience.role}
                bullets={experience.bullets}
                icon={experience.icon}
              />
            ))}
          </VerticalTimeline>
        </Collapse>
      </div>
    </Section>
  );
};

export default Experience;

import { useState } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { beyondWorkExperiences, primaryExperiences } from '../../data/experiences';
import { Section, SectionHeading } from '../layout';
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
      <VerticalTimeline lineColor="#E5E5E5">
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
        <Button variant="ghost" onClick={() => setShowBeyondWork(!showBeyondWork)}>
          {showBeyondWork ? 'Hide beyond work' : 'Show beyond work'}
        </Button>
        {showBeyondWork && (
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
        )}
      </div>
    </Section>
  );
};

export default Experience;

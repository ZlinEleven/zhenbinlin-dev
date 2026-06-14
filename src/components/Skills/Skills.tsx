import skillGroups from '../../data/skills';
import { Section, SectionHeading } from '../layout';
import { Badge } from '../ui';

const Skills = () => {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Technical"
        title="Skills"
        subtitle="Technologies I use in production and side projects."
      />
      <div className="grid gap-8 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-sm font-medium uppercase tracking-wider text-accent">
              {group.title}
            </h3>
            {group.subtitle && (
              <p className="mt-1 text-sm text-muted">{group.subtitle}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} interactive>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;

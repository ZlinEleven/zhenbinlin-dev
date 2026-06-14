import projects from '../../data/projects';
import { Section, SectionHeading } from '../layout';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Work"
        title="Projects"
        subtitle="Featured builds with measurable impact."
      />

      <div className="flex flex-col gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}

        {secondary.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {secondary.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Projects;

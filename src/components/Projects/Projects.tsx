import projects from '../../data/projects';
import { Section, SectionHeading } from '../layout';
import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Work"
        title="Projects"
        subtitle="Featured builds with measurable impact."
      />
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;

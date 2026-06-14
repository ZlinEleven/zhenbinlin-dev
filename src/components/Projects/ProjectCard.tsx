import { Badge, Button, Card } from '../ui';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectVisual = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        className={
          featured
            ? 'block h-full w-full object-contain object-center'
            : 'block w-full object-contain'
        }
        loading="lazy"
        decoding="async"
      />
    );
  }

  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full min-h-[12rem] w-full items-center justify-center bg-gradient-to-br from-accent/15 via-accent/5 to-background">
      <span className="font-mono text-5xl font-bold tracking-tight text-accent/25">{initials}</span>
    </div>
  );
};

const ProjectContent = ({ project }: { project: Project }) => (
  <>
    <div>
      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
      <p className="mt-2 text-base font-medium text-accent">{project.hook}</p>
    </div>

    <ul className="flex flex-col gap-2 text-muted">
      {project.bullets.map((bullet) => (
        <li key={bullet} className="flex gap-2 leading-relaxed">
          <span
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125 motion-reduce:transform-none"
            aria-hidden="true"
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-2">
      {project.tech.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>

    {(project.githubUrl || project.liveUrl) && (
      <div className="flex flex-wrap gap-3 pt-1">
        {project.githubUrl && (
          <Button
            variant="secondary"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link gap-1.5"
          >
            GitHub
            <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 motion-reduce:transform-none">
              →
            </span>
          </Button>
        )}
        {project.liveUrl && (
          <Button
            variant="secondary"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link gap-1.5"
          >
            Live demo
            <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 motion-reduce:transform-none">
              →
            </span>
          </Button>
        )}
      </div>
    )}
  </>
);

const ProjectCard = ({ project }: ProjectCardProps) => {
  if (project.featured) {
    return (
      <Card as="article" interactive className="group overflow-hidden p-0">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="relative flex min-h-[12rem] items-stretch overflow-hidden border-b border-border bg-background lg:min-h-full lg:border-b-0 lg:border-r">
            <ProjectVisual project={project} featured />
          </div>
          <div className="flex flex-col gap-5 p-6">
            <ProjectContent project={project} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card as="article" interactive className={`group flex flex-col ${project.image ? 'overflow-hidden p-0' : 'gap-5'}`}>
      {project.image && (
        <div className="overflow-hidden border-b border-border bg-background">
          <ProjectVisual project={project} />
        </div>
      )}
      <div className={project.image ? 'flex flex-col gap-5 p-6' : 'contents'}>
        <ProjectContent project={project} />
      </div>
    </Card>
  );
};

export default ProjectCard;

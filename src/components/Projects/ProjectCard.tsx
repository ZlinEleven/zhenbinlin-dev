import { Badge, Button, Card } from '../ui';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card as="article" interactive className="group flex flex-col gap-5">
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
    </Card>
  );
};

export default ProjectCard;

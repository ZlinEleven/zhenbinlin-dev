import avatar from '../../assets/images/formal_profile_picture.jpg';
import { Link } from 'react-scroll';
import { RESUME_URL, SCROLL_OFFSET } from '../../data/navbarTabs';
import { Button } from '../ui';
import LifeCarousel from './LifeCarousel';

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-border bg-surface"
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-content flex-col justify-center px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-accent">
              Hi, my name is
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Zhenbin Lin
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              I build distributed systems that scale — from SageMaker evaluation pipelines at
              Amazon to payments microservices at Capital One.
            </p>
            <p className="mt-4 text-sm font-medium text-muted">
              BS CS @ Stony Brook (Magna Cum Laude) · Amazon SDE Intern · GT MS CS Fall 2026
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="projects"
              spy
              smooth
              offset={SCROLL_OFFSET}
              duration={500}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Projects
            </Link>
              <Button variant="secondary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Download Resume
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <img
              src={avatar}
              alt="Zhenbin Lin"
              className="size-48 rounded-full border-4 border-border object-cover shadow-md sm:size-56 lg:size-64"
              loading="eager"
            />
          </div>
        </div>

        <details className="group mt-20 rounded-xl border border-border bg-background">
          <summary className="cursor-pointer list-none px-6 py-4 font-medium text-foreground transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              Beyond code — life moments
              <span className="text-muted transition-transform group-open:rotate-180">▾</span>
            </span>
          </summary>
          <div className="border-t border-border px-4 pb-6 pt-4">
            <LifeCarousel />
          </div>
        </details>
      </div>
    </section>
  );
};

export default About;

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
            <p
              className="animate-fade-up mb-3 font-mono text-sm font-medium uppercase tracking-wider text-accent"
              style={{ animationDelay: '0ms' }}
            >
              Hi, my name is
            </p>
            <h1
              className="animate-fade-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '100ms' }}
            >
              Zhenbin Lin
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
              style={{ animationDelay: '200ms' }}
            >
              I build distributed systems that scale — from SageMaker evaluation pipelines at
              Amazon to payments microservices at Capital One.
            </p>
            <p
              className="animate-fade-up mt-4 text-sm font-medium text-muted"
              style={{ animationDelay: '300ms' }}
            >
              BS CS @ Stony Brook (Magna Cum Laude) · Amazon SDE Intern · GT MS CS Fall 2026
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: '400ms' }}
            >
              <Link
                to="projects"
                spy
                smooth
                offset={SCROLL_OFFSET}
                duration={500}
                className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-[color,transform,background-color] hover:bg-accent-hover active:scale-[0.98] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View Projects
                <span className="inline-block -translate-x-1 opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100">
                  →
                </span>
              </Link>
              <Button variant="secondary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Download Resume
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="group rounded-full ring-4 ring-transparent transition-[box-shadow] duration-300 hover:ring-accent/40 motion-reduce:transition-none">
              <img
                src={avatar}
                alt="Zhenbin Lin"
                className="size-48 rounded-full border-4 border-border object-cover shadow-md sm:size-56 lg:size-64"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <details className="group mt-20 rounded-xl border border-border bg-background">
          <summary className="cursor-pointer list-none px-6 py-4 font-medium text-foreground transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              Beyond code — life moments
              <span className="text-muted transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none">
                ▾
              </span>
            </span>
          </summary>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="overflow-hidden">
              <div className="border-t border-border px-4 pb-6 pt-4">
                <LifeCarousel />
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
};

export default About;

import avatar from '../../assets/images/formal_profile_picture.jpg';
import { RESUME_URL } from '../../data/navbarTabs';
import { Button, ScrollLink } from '../ui';
import LifeCarousel from './LifeCarousel';

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-border bg-surface"
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-content flex-col justify-center px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="order-1">
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
            <ul
              className="animate-fade-up mt-4 flex flex-col gap-1 text-sm font-medium text-muted"
              style={{ animationDelay: '300ms' }}
            >
              <li>BS CS @ Stony Brook (Magna Cum Laude)</li>
              <li>MS CS @ Georgia Tech (Fall 2026)</li>
              <li>Amazon SDE Intern</li>
            </ul>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: '400ms' }}
            >
              <Button variant="primary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Download Resume
              </Button>
              <ScrollLink to="experience" variant="secondary" showArrow>
                View Experience
              </ScrollLink>
            </div>
          </div>

          <div className="order-2 flex justify-center">
            <div className="group rounded-full ring-4 ring-transparent transition-[box-shadow] duration-300 hover:ring-accent/40 motion-reduce:transition-none">
              <img
                src={avatar}
                alt="Zhenbin Lin"
                className="size-40 rounded-full border-4 border-border object-cover shadow-md sm:size-48 lg:size-64"
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

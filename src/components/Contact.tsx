import { useCallback, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Section, SectionHeading } from './layout';
import { Button } from './ui';

const EMAIL = 'zhenblin2004@gmail.com';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [pulse, setPulse] = useState(false);
  const resetTimeoutRef = useRef<number>();

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setPulse(true);
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        setPulse(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <Section id="contact" className="border-t border-border bg-surface">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact"
        subtitle="Open to opportunities, collaborations, and conversations about software engineering."
      />

      <div className="mx-auto max-w-lg">
        <p className="mb-8 text-center text-muted">
          Email me at{' '}
          <a href={`mailto:${EMAIL}`} className="font-medium text-accent hover:text-accent-hover">
            {EMAIL}
          </a>{' '}
          or send a message below.
        </p>

        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-[color,transform,box-shadow,border-color] hover:border-accent/40 hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:transform-none ${pulse ? 'animate-copy-pulse border-accent/40' : ''}`}
          >
            {copied ? (
              <>
                <FaCheck size={14} className="text-accent" aria-hidden="true" />
                Copied!
              </>
            ) : (
              'Copy email'
            )}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email copied to clipboard' : ''}
          </span>
        </div>

        <form
          action="https://getform.io/f/77d35fe9-c101-4db8-8498-a98838ad1e30"
          method="POST"
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              rows={5}
              name="message"
              required
            />
          </div>
          <Button type="submit" className="self-center">
            Send message
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default Contact;

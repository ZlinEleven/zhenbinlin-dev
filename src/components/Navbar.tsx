import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { Button } from './ui';
import navbarTabs, { RESUME_URL, SCROLL_OFFSET } from '../data/navbarTabs';

const navLinkClass =
  'relative z-10 cursor-pointer rounded-md text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef('about');
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const mobileNavId = useId();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const updateIndicator = useCallback((tabId: string) => {
    const navEl = navRef.current;
    if (!navEl) return;

    const tabEl = navEl.querySelector<HTMLAnchorElement>(`[data-tab-id="${tabId}"]`);
    if (!tabEl) return;

    const navRect = navEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    setIndicator({
      left: tabRect.left - navRect.left,
      width: tabRect.width,
    });
  }, []);

  const handleSetActive = useCallback(
    (tabId: string) => {
      activeTabRef.current = tabId;
      updateIndicator(tabId);
    },
    [updateIndicator],
  );

  useEffect(() => {
    updateIndicator(activeTabRef.current);

    const handleResize = () => updateIndicator(activeTabRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobile();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={SCROLL_OFFSET}
          duration={500}
          className="cursor-pointer rounded-md text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onSetActive={() => handleSetActive('about')}
        >
          Zhenbin Lin
        </Link>

        <nav ref={navRef} className="relative hidden items-center gap-6 md:flex">
          <span
            className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-accent transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
            style={{ left: indicator.left, width: indicator.width }}
            aria-hidden="true"
          />
          {navbarTabs.map((tab) => (
            <Link
              key={tab.id}
              data-tab-id={tab.id}
              to={tab.id}
              spy={true}
              smooth={true}
              offset={tab.offset}
              duration={500}
              activeClass="!text-accent"
              className={navLinkClass}
              onSetActive={() => handleSetActive(tab.id)}
            >
              {tab.name}
            </Link>
          ))}
          <Button variant="secondary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls={mobileNavId}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <nav
        id={mobileNavId}
        className={`overflow-hidden border-t border-border bg-surface transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navbarTabs.map((tab) => (
            <li key={tab.id}>
              <Link
                to={tab.id}
                spy={true}
                smooth={true}
                offset={tab.offset}
                duration={500}
                activeClass="!text-accent"
                className={`block rounded-lg px-3 py-2.5 ${navLinkClass}`}
                onClick={closeMobile}
                onSetActive={() => handleSetActive(tab.id)}
              >
                {tab.name}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button
              variant="secondary"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={closeMobile}
            >
              Resume
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

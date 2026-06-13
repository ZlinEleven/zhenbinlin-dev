import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { Button } from './ui';
import navbarTabs, { RESUME_URL, SCROLL_OFFSET } from '../data/navbarTabs';

const navLinkClass =
  'cursor-pointer text-sm font-medium text-muted transition-colors hover:text-foreground';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={SCROLL_OFFSET}
          duration={500}
          className="cursor-pointer text-base font-semibold tracking-tight text-foreground"
        >
          Zhenbin Lin
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navbarTabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.id}
              spy={true}
              smooth={true}
              offset={tab.offset}
              duration={500}
              activeClass="!text-accent"
              className={navLinkClass}
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
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-background md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
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
      )}
    </header>
  );
};

export default Navbar;

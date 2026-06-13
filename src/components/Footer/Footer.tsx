import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { RESUME_URL } from '../../data/navbarTabs';
import LastUpdated from './LastUpdated';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zhenbin-lin',
    icon: FaLinkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ZlinEleven',
    icon: FaGithub,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/zlin_eleven/',
    icon: FaInstagram,
  },
  {
    name: 'Resume',
    href: RESUME_URL,
    icon: ImProfile,
  },
] as const;

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-foreground">Zhenbin Lin</p>
          <p className="mt-1 text-sm text-muted">
            Software Engineer · Amazon · Capital One · GT MS CS
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-background hover:text-accent"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border pb-6">
        <LastUpdated />
      </div>
    </footer>
  );
};

export default Footer;

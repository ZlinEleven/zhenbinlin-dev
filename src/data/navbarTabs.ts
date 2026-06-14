import type { NavbarTab } from '../types';

export const NAVBAR_HEIGHT = 64;
export const SCROLL_OFFSET = -NAVBAR_HEIGHT;

const navbarTabs: NavbarTab[] = [
  { id: 'about', name: 'About', offset: SCROLL_OFFSET },
  { id: 'experience', name: 'Experience', offset: SCROLL_OFFSET },
  { id: 'projects', name: 'Projects', offset: SCROLL_OFFSET },
  { id: 'skills', name: 'Skills', offset: SCROLL_OFFSET },
  { id: 'education', name: 'Education', offset: SCROLL_OFFSET },
  { id: 'contact', name: 'Contact', offset: SCROLL_OFFSET },
];

export const RESUME_URL =
  'https://drive.google.com/file/d/1JbtAwQlNt0Xo2QTBeJjw2I7yPyZuMwVt/view?usp=sharing';

export default navbarTabs;

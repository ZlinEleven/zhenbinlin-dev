import loqiPreview from '../assets/images/projects/loqi-preview.png';
import type { Project } from '../types/project';

const projects: Project[] = [
  {
    title: 'Loqi',
    featured: true,
    image: loqiPreview,
    hook: 'AI study platform deployed to 180+ students',
    bullets: [
      'Deployed an AI-driven study platform to 180+ students in collaboration with faculty for a 3-month beta test.',
      'Managed a team of 6 engineers to architect 3 Docker-containerized microservices using Google Cloud Functions and OpenAI LLMs.',
      'Built a mobile-responsive web app with Next.js, TypeScript, and Tailwind CSS, hosted on Vercel.',
    ],
    tech: [
      'Next.js',
      'Express.js',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'GCP',
      'Docker',
      'OpenAI',
    ],
    githubUrl: 'https://github.com/viLoqi',
    liveUrl: 'https://loqi.jiechen.dev/',
  },
  {
    title: 'VRA Redistricting Analyzer',
    hook: 'Exploring the impact of dismissing Section 2 of the Voting Rights Act',
    bullets: [
      'Built a CSE416 team project to analyze how dismissing Section 2 of the VRA could affect redistricting outcomes, minority representation, and election fairness across multiple states.',
      'Developed a React + TypeScript frontend with Leaflet maps, Recharts, and analysis views for Gingles curves, ensemble splits, ecological inference, and precinct heatmaps.',
      'Implemented a Spring Boot REST API backed by MongoDB and GridFS, with Jersey endpoints and cached service-layer aggregates for GeoJSON and election data.',
    ],
    tech: [
      'React',
      'TypeScript',
      'Spring Boot',
      'MongoDB',
      'Leaflet',
      'Recharts',
      'Java',
      'Vite',
    ],
    githubUrl: 'https://github.com/CSE416Pirates',
  },
  {
    title: 'WellDone Inspection',
    hook: 'Client website for an NYC construction inspection company',
    bullets: [
      'Co-built a production website with my sister for my brother-in-law\'s inspection business, from requirements gathering through launch.',
      'Developed a multi-page React site showcasing TR1–TR8 inspection services, company qualifications, and a project portfolio with responsive Tailwind layouts.',
      'Integrated an EmailJS contact form and deployed the site to welldoneinspection.com.',
    ],
    tech: ['React', 'React Router', 'Tailwind CSS', 'EmailJS'],
    githubUrl: 'https://github.com/Mallow-Lin/Welldone-Inspection-website',
    liveUrl: 'https://welldoneinspection.com/',
  },
  {
    title: 'Portfolio',
    hook: 'Personal site with design system and scroll-driven UX',
    bullets: [
      'Built a React + TypeScript portfolio with reusable layout primitives, themed sections, and accessible interactions.',
      'Deployed to GitHub Pages with automated build metadata and Open Graph social previews.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/ZlinEleven/zhenbinlin-dev',
    liveUrl: 'https://www.zhenbinlin.com/',
  },
];

export default projects;

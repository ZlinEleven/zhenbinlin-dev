import type { Project } from '../types/project';

const projects: Project[] = [
  {
    title: 'Loqi',
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
  },
];

export default projects;

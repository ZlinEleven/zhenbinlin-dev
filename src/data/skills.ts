export interface SkillGroup {
  title: string;
  subtitle?: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Production',
    subtitle: 'Shipped in internships and side projects',
    items: [
      'Python',
      'Java',
      'TypeScript',
      'SQL',
      'Spring Boot',
      'Node.js',
      'React',
      'AWS',
      'Docker',
      'Kubernetes',
      'Redis',
      'PostgreSQL',
    ],
  },
  {
    title: 'Also familiar with',
    subtitle: 'Used in coursework, labs, and personal builds',
    items: [
      'JavaScript',
      'C',
      'C++',
      'Bash',
      'Kotlin',
      'Golang',
      'MongoDB',
      'FastAPI',
      'Next.js',
      'GraphQL',
      'GCP',
      'Firebase',
      'SageMaker',
      'Jest',
      'Git',
    ],
  },
];

export default skillGroups;

export interface SkillGroup {
  title: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: [
      'Python',
      'Java',
      'C',
      'C++',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Bash',
      'Kotlin',
      'Golang',
    ],
  },
  {
    title: 'Frameworks & Databases',
    items: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'Next.js',
      'React',
      'GraphQL',
    ],
  },
  {
    title: 'Infrastructure & Tools',
    items: [
      'AWS',
      'SageMaker',
      'CDK',
      'GCP',
      'Firebase',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Jest',
      'JUnit',
      'Git',
      'Jira',
    ],
  },
];

export default skillGroups;

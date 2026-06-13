import type { Experience } from '../types';
import { MdOutlineWork } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa6';

export const primaryExperiences: Experience[] = [
  {
    date: 'May 2026 – Aug 2026',
    title: 'Amazon',
    role: 'Software Development Engineer Intern · Seattle, WA',
    bullets: [
      'Built a distributed evaluation pipeline on AWS SageMaker using Ray to parallelize 10,000+ independent statistical evaluations, reducing runtime and compute cost by 90%.',
      'Designed a pluggable evaluation framework that expanded candidate search space from 5 to 200+, enabling scientists to rank experiment designs across 10+ custom methodologies.',
      'Automated a manual experiment design workflow, scaling scientist throughput from ~5 candidates/day to 1000+.',
    ],
    icon: <MdOutlineWork />,
  },
  {
    date: 'Jun 2025 – Aug 2025',
    title: 'Capital One',
    role: 'Software Engineering Intern · Richmond, VA',
    bullets: [
      'Architected an automated transaction validation system using AWS SQS, Lambda, and S3 events to streamline microservice communication.',
      'Eliminated manual data validation and replaced third-party dependencies, reducing operational costs by 80% and enabling real-time anomaly detection.',
      'Integrated private SDP streams with OpenSearch, reducing data latency by 50% for the OnePay platform.',
      'Maintained 100% test coverage using Jest across unit, integration, and E2E suites.',
    ],
    icon: <MdOutlineWork />,
  },
  {
    date: 'Jun 2024 – Aug 2024',
    title: 'Angi',
    role: 'Software Engineering Intern · New York, NY',
    bullets: [
      'Increased Google Search click-through rate by 12% by modifying JSON-LD schema for SEO and Google indexing.',
      'Enabled Contentful workflow for 2,800 employees by integrating 3 microservices across distributed architecture.',
      'Achieved 2s updates by building REST API in Spring Boot with Redis caching against a GraphQL data layer.',
      'Authored 10+ unit tests with JUnit and deployed 5 production releases to Kubernetes via Jenkins CI/CD pipeline.',
    ],
    icon: <MdOutlineWork />,
  },
  {
    date: 'Jun 2023 – Aug 2023',
    title: 'Palapa',
    role: 'Software Engineering Intern · New York, NY',
    bullets: [
      'Optimized ingestion utilities for concurrent uploads and multiple file formats, boosting efficiency by 30%.',
      'Engineered a data cleanup service to synchronize deletions across Firebase Storage and Firestore, reducing orphaned storage records by 99%.',
      'Developed an admin photo-management module integrating Firebase Auth and Storage for secured access controls.',
    ],
    icon: <MdOutlineWork />,
  },
];

export const beyondWorkExperiences: Experience[] = [
  {
    date: 'Jan 2025 – May 2025',
    title: 'Stony Brook University',
    role: 'Teaching Assistant · CSE 316 (Software Engineering)',
    bullets: [
      'Conducted weekly office hours and supported 160+ students in web development fundamentals.',
    ],
    icon: <FaChalkboardTeacher />,
  },
  {
    date: 'Jan 2024 – May 2024',
    title: 'Stony Brook University',
    role: 'Teaching Assistant · CSE 220 (Systems Fundamentals)',
    bullets: [
      'Conducted weekly office hours and supported 160+ students in systems-level programming.',
    ],
    icon: <FaChalkboardTeacher />,
  },
  {
    date: 'Jan 2024 – May 2026',
    title: 'Stony Brook DoIT',
    role: 'Academic Technology Services Technician',
    bullets: [
      'Provided technical support across 50,000+ courses; mentored interns and led workshops for 500+ faculty and staff.',
    ],
    icon: <MdOutlineWork />,
  },
  {
    date: 'Sep 2019 – May 2022',
    title: 'Overclock Robotics',
    role: 'Chief Executive Programmer & Vice Captain',
    bullets: [
      'Led programming development for VEX competition teams; NY State Champion (2019–20, 2021–22) and 2022 VEX Worlds Division Champion.',
    ],
    icon: <FaRobot />,
  },
];

import type { ReactNode } from 'react';

export interface NavbarTab {
  id: string;
  name: string;
  offset: number;
}

export interface Experience {
  date: string;
  title: string;
  role: string;
  bullets: string[];
  icon: ReactNode;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Course {
  title: string;
  courseNum?: string;
  grade?: string;
  desc?: string;
}

export type CoursesBySemester = Record<string, Course[]>;

export interface LifeCarouselSlide {
  src: string[];
  alt: string;
  caption: string;
  description: string;
}

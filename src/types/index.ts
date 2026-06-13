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
  desc: string;
  icon: ReactNode;
}

export interface SkillItem {
  name: string;
  icon: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface SocialLink {
  name: string;
  background: string;
  link: string;
  icon: ReactNode;
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

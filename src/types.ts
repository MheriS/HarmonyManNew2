import type { ReactNode } from 'react';

export type TabType = 'overview' | 'projects' | 'resume' | 'contact';

export interface Education {
    degree: string;
    school: string;
    location: string;
    period: string;
    gpa: string;
    achievements: (string | ReactNode)[];
    status: string;
}

export interface SkillItem {
  name: string;
  category: 'core' | 'framework' | 'db' | 'tool';
  iconName: string; // Dynamic icon reference or styling
  level?: string;   // Optional level descriptor e.g. "Advanced" or "Intermediate"
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface RepoLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  tech: string[];
  demo: string;
  github: RepoLink[];
  type: string;
  isSuccessful?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education';
  badge?: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    validUntil: string;
    credentialId: string;
    status: string;
    level: string;
    category: string;
    logo: string;
    skills: string[];
    verifyUrl: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  year: string;
  author: string;
  url?: string;
  doi?: string;
}

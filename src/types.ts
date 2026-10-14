import type { ReactNode } from 'react';

export type TabType = 'overview' | 'projects' | 'resume' | 'contact';

//Untuk mendefinisikan type data agar pada saat pengisian data tidak terjadi kesalahan

export interface Education {
  id?: string;
  degree: string;
  degreeEn?: string;
  school: string;
  schoolEn?: string;
  location: string;
  locationEn?: string;
  period: string;
  gpa: string;
  achievements: (string | ReactNode)[];
  achievementsEn?: string[];
  status: string;
  fieldOfStudy?: string;
  fieldOfStudyEn?: string;
  description?: string;
  descriptionEn?: string;
  mediaUrl?: string;
  mediaUrls?: string[];
  mediaName?: string;
  mediaNames?: string[];
  mediaType?: 'image' | 'pdf' | 'link';
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
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  images?: string[];
  tech: string[];
  demo: string;
  github: RepoLink[];
  type: string;
  typeEn?: string;
  isSuccessful?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  roleEn?: string;
  company: string;
  companyEn?: string;
  period: string;
  description: string[];
  descriptionEn?: string[];
  type: 'work' | 'education';
  badge?: string;
  badgeEn?: string;
  location?: string;
  locationEn?: string;
  mediaUrl?: string;
  mediaUrls?: string[];
  mediaName?: string;
  mediaNames?: string[];
}

export interface Certification {
  id?: string;
  name: string;
  nameEn?: string;
  issuer: string;
  issuerEn?: string;
  date: string;
  validUntil: string;
  credentialId: string;
  status: string;
  level: string;
  category: string;
  logo: string;
  skills: string[];
  skillsEn?: string[];
  verifyUrl: string;
  description?: string;
  descriptionEn?: string;
  mediaUrl?: string;
  mediaUrls?: string[];
  mediaName?: string;
  mediaNames?: string[];
  mediaType?: 'image' | 'pdf' | 'link';
}

export interface PublicationItem {
  id: string;
  title: string;
  titleEn?: string;
  journal: string;
  journalEn?: string;
  year: string;
  author: string;
  url?: string;
  doi?: string;
  description?: string;
  descriptionEn?: string;
  mediaUrl?: string;
  mediaUrls?: string[];
  mediaName?: string;
  mediaNames?: string[];
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photo: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeCustomization {
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  spacing: number;
  sectionsVisible: Record<string, boolean>;
  sectionOrder: string[];
}

export type TemplateName = 'minimal' | 'corporate' | 'creative' | 'dark' | 'elegant' | 'executive' | 'modern' | 'silicon' | 'wallstreet' | 'billionaire';

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  template: TemplateName;
  customization: ResumeCustomization;
}

export const DEFAULT_SECTION_ORDER = ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects'];

export const FONT_OPTIONS = [
  { label: 'Inter', value: "'Inter', sans-serif" },
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Merriweather', value: "'Merriweather', serif" },
  { label: 'Roboto Slab', value: "'Roboto Slab', serif" },
  { label: 'Source Sans 3', value: "'Source Sans 3', sans-serif" },
];

export const TEMPLATE_INFO: Record<TemplateName, { name: string; description: string; premium: boolean }> = {
  minimal: { name: 'The Minimalist', description: 'Clean, simple, and effective for any role.', premium: false },
  corporate: { name: 'Corporate Pro', description: 'Traditional and reliable for established firms.', premium: false },
  creative: { name: 'Creative Pulse', description: 'Stand out with a design that speaks your talent.', premium: true },
  dark: { name: 'Dark Mode', description: 'Sleek and professional for tech and design.', premium: true },
  elegant: { name: 'The Elegant', description: 'A sophisticated touch for senior positions.', premium: true },
  executive: { name: 'Executive Slate', description: 'Premium sidebar layout for management elite.', premium: true },
  modern: { name: 'Modern Orbit', description: 'Contemporary aesthetic with balanced whitespace.', premium: true },
  silicon: { name: 'Silicon Valley Elite', description: 'ATS-Perfect single column. Hired at Google & Apple.', premium: true },
  wallstreet: { name: 'Wall Street Professional', description: 'High-stakes prestige. Trusted by Microsoft & Banking.', premium: true },
  billionaire: { name: 'The Billionaire Edition', description: 'The gold standard for CEOs and high-level leaders.', premium: true },
};

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '', title: '', email: '', phone: '',
    location: '', website: '', summary: '', photo: '',
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
  template: 'minimal',
  customization: {
    primaryColor: '#d97706',
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    spacing: 1,
    sectionsVisible: {
      personalInfo: true, summary: true, experience: true,
      education: true, skills: true, projects: true,
    },
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  },
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ResumeData, defaultResumeData, TemplateName, ResumeCustomization } from '@/types/resume';

interface ResumeContextType {
  data: ResumeData;
  updatePersonalInfo: (field: string, value: string) => void;
  addSkill: (name: string) => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, field: string, value: string | number) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | boolean) => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, field: string, value: string) => void;
  removeProject: (id: string) => void;
  setTemplate: (t: TemplateName) => void;
  updateCustomization: (updates: Partial<ResumeCustomization>) => void;
  setSectionOrder: (order: string[]) => void;
  isPaid: boolean;
  setIsPaid: (v: boolean) => void;
  currentStep: number;
  setCurrentStep: (s: number) => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};

const STORAGE_KEY = 'resume-builder-data';
const uid = () => crypto.randomUUID();

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultResumeData, ...JSON.parse(saved) } : defaultResumeData;
    } catch { return defaultResumeData; }
  });
  const [isPaid, setIsPaid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setData(d => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
  }, []);

  const addSkill = useCallback((name: string) => {
    setData(d => ({ ...d, skills: [...d.skills, { id: uid(), name, level: 3 }] }));
  }, []);
  const removeSkill = useCallback((id: string) => {
    setData(d => ({ ...d, skills: d.skills.filter(s => s.id !== id) }));
  }, []);
  const updateSkill = useCallback((id: string, field: string, value: string | number) => {
    setData(d => ({ ...d, skills: d.skills.map(s => s.id === id ? { ...s, [field]: value } : s) }));
  }, []);

  const addEducation = useCallback(() => {
    setData(d => ({ ...d, education: [...d.education, { id: uid(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }] }));
  }, []);
  const updateEducation = useCallback((id: string, field: string, value: string) => {
    setData(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));
  }, []);
  const removeEducation = useCallback((id: string) => {
    setData(d => ({ ...d, education: d.education.filter(e => e.id !== id) }));
  }, []);

  const addExperience = useCallback(() => {
    setData(d => ({ ...d, experience: [...d.experience, { id: uid(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }] }));
  }, []);
  const updateExperience = useCallback((id: string, field: string, value: string | boolean) => {
    setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));
  }, []);
  const removeExperience = useCallback((id: string) => {
    setData(d => ({ ...d, experience: d.experience.filter(e => e.id !== id) }));
  }, []);

  const addProject = useCallback(() => {
    setData(d => ({ ...d, projects: [...d.projects, { id: uid(), name: '', description: '', technologies: '', link: '' }] }));
  }, []);
  const updateProject = useCallback((id: string, field: string, value: string) => {
    setData(d => ({ ...d, projects: d.projects.map(p => p.id === id ? { ...p, [field]: value } : p) }));
  }, []);
  const removeProject = useCallback((id: string) => {
    setData(d => ({ ...d, projects: d.projects.filter(p => p.id !== id) }));
  }, []);

  const setTemplate = useCallback((t: TemplateName) => {
    setData(d => ({ ...d, template: t }));
  }, []);
  const updateCustomization = useCallback((updates: Partial<ResumeCustomization>) => {
    setData(d => ({ ...d, customization: { ...d.customization, ...updates } }));
  }, []);
  const setSectionOrder = useCallback((order: string[]) => {
    setData(d => ({ ...d, customization: { ...d.customization, sectionOrder: order } }));
  }, []);

  return (
    <ResumeContext.Provider value={{
      data, updatePersonalInfo, addSkill, removeSkill, updateSkill,
      addEducation, updateEducation, removeEducation,
      addExperience, updateExperience, removeExperience,
      addProject, updateProject, removeProject,
      setTemplate, updateCustomization, setSectionOrder,
      isPaid, setIsPaid, currentStep, setCurrentStep,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

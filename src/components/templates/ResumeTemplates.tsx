import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Star } from 'lucide-react';

interface Props {
  data: ResumeData;
  watermark?: boolean;
}

const SectionWrapper = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => {
  if (!visible) return null;
  return <div style={{ breakInside: 'avoid' }}>{children}</div>;
};

export const MinimalTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 16}px`;

  return (
    <div style={{ fontFamily: c.fontFamily, fontSize: `${c.fontSize}px`, lineHeight: 1.5 }} className="relative">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="text-center pb-4" style={{ borderBottom: `2px solid ${color}`, marginBottom: gap }}>
          {p.photo && <img src={p.photo} alt="" className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />}
          <h1 className="text-2xl font-bold tracking-tight" style={{ color }}>{p.fullName || 'Your Name'}</h1>
          <p className="text-sm opacity-70 mt-0.5">{p.title}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs opacity-60">
            {p.email && <span className="flex items-center gap-1"><Mail size={10} />{p.email}</span>}
            {p.phone && <span className="flex items-center gap-1"><Phone size={10} />{p.phone}</span>}
            {p.location && <span className="flex items-center gap-1"><MapPin size={10} />{p.location}</span>}
            {p.website && <span className="flex items-center gap-1"><Globe size={10} />{p.website}</span>}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.summary}>
        {p.summary && <div style={{ marginBottom: gap }}><p className="text-sm leading-relaxed opacity-80">{p.summary}</p></div>}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.experience}>
        {experience.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color }}><Briefcase size={12} />Experience</h2>
            {experience.map(e => (
              <div key={e.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{e.position}</h3>
                  <span className="text-xs opacity-50">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                </div>
                <p className="text-xs opacity-60 mb-1">{e.company}</p>
                <p className="text-xs opacity-70 whitespace-pre-line">{e.description}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.education}>
        {education.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color }}><GraduationCap size={12} />Education</h2>
            {education.map(e => (
              <div key={e.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{e.degree} in {e.field}</h3>
                  <span className="text-xs opacity-50">{e.startDate} — {e.endDate}</span>
                </div>
                <p className="text-xs opacity-60">{e.institution} {e.gpa && `• GPA: ${e.gpa}`}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.skills}>
        {skills.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color }}><Star size={12} />Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s.id} className="px-2 py-0.5 text-xs rounded" style={{ background: `${color}15`, color }}>{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.projects}>
        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color }}><Code size={12} />Projects</h2>
            {projects.map(pr => (
              <div key={pr.id} className="mb-2">
                <h3 className="font-semibold text-sm">{pr.name}</h3>
                <p className="text-xs opacity-60">{pr.technologies}</p>
                <p className="text-xs opacity-70">{pr.description}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export const CorporateTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = '#1e40af';
  const gap = `${c.spacing * 14}px`;

  return (
    <div style={{ fontFamily: c.fontFamily, fontSize: `${c.fontSize}px` }} className="relative">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}
      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="p-5 rounded-t-lg" style={{ background: color }}>
          <div className="flex items-center gap-4">
            {p.photo && <img src={p.photo} alt="" className="w-14 h-14 rounded-full border-2 border-white/30 object-cover" />}
            <div className="text-white">
              <h1 className="text-xl font-bold">{p.fullName || 'Your Name'}</h1>
              <p className="text-sm opacity-80">{p.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/70">
            {p.email && <span className="flex items-center gap-1"><Mail size={10} />{p.email}</span>}
            {p.phone && <span className="flex items-center gap-1"><Phone size={10} />{p.phone}</span>}
            {p.location && <span className="flex items-center gap-1"><MapPin size={10} />{p.location}</span>}
          </div>
        </div>
      </SectionWrapper>

      <div className="p-5 space-y-0" style={{ gap }}>
        <SectionWrapper visible={c.sectionsVisible.summary}>
          {p.summary && <div style={{ marginBottom: gap }}><p className="text-sm opacity-80">{p.summary}</p></div>}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.experience}>
          {experience.length > 0 && (
            <div style={{ marginBottom: gap }}>
              <h2 className="font-bold text-sm uppercase tracking-wider pb-1 mb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Professional Experience</h2>
              {experience.map(e => (
                <div key={e.id} className="mb-3 pl-3" style={{ borderLeft: `3px solid ${color}20` }}>
                  <h3 className="font-semibold text-sm">{e.position} <span className="font-normal opacity-60">at {e.company}</span></h3>
                  <p className="text-xs opacity-50 mb-1">{e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                  <p className="text-xs opacity-70 whitespace-pre-line">{e.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.education}>
          {education.length > 0 && (
            <div style={{ marginBottom: gap }}>
              <h2 className="font-bold text-sm uppercase tracking-wider pb-1 mb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Education</h2>
              {education.map(e => (
                <div key={e.id} className="mb-2">
                  <h3 className="font-semibold text-sm">{e.degree} — {e.field}</h3>
                  <p className="text-xs opacity-60">{e.institution} | {e.startDate} — {e.endDate} {e.gpa && `| GPA: ${e.gpa}`}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.skills}>
          {skills.length > 0 && (
            <div style={{ marginBottom: gap }}>
              <h2 className="font-bold text-sm uppercase tracking-wider pb-1 mb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => <span key={s.id} className="px-2 py-0.5 text-xs rounded font-medium" style={{ background: `${color}10`, color }}>{s.name}</span>)}
              </div>
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.projects}>
          {projects.length > 0 && (
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wider pb-1 mb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Projects</h2>
              {projects.map(pr => (
                <div key={pr.id} className="mb-2">
                  <h3 className="font-semibold text-sm">{pr.name} <span className="text-xs font-normal opacity-50">{pr.technologies}</span></h3>
                  <p className="text-xs opacity-70">{pr.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      </div>
    </div>
  );
};

export const CreativeTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 14}px`;

  return (
    <div style={{ fontFamily: c.fontFamily, fontSize: `${c.fontSize}px` }} className="relative">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}
      <div className="flex">
        <div className="w-[35%] p-5 min-h-full" style={{ background: color }}>
          <SectionWrapper visible={c.sectionsVisible.personalInfo}>
            {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-full border-4 border-white/20 mb-3 object-cover" />}
            <h1 className="text-lg font-bold text-white">{p.fullName || 'Your Name'}</h1>
            <p className="text-xs text-white/70 mb-4">{p.title}</p>
            <div className="space-y-1.5 text-xs text-white/80">
              {p.email && <p className="flex items-center gap-1.5"><Mail size={10} />{p.email}</p>}
              {p.phone && <p className="flex items-center gap-1.5"><Phone size={10} />{p.phone}</p>}
              {p.location && <p className="flex items-center gap-1.5"><MapPin size={10} />{p.location}</p>}
              {p.website && <p className="flex items-center gap-1.5"><Globe size={10} />{p.website}</p>}
            </div>
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.skills}>
            {skills.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-2">Skills</h2>
                <div className="space-y-1">
                  {skills.map(s => (
                    <div key={s.id}>
                      <span className="text-xs text-white/80">{s.name}</span>
                      <div className="w-full h-1 rounded-full bg-white/20 mt-0.5">
                        <div className="h-full rounded-full bg-white/70" style={{ width: `${s.level * 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.education}>
            {education.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-2">Education</h2>
                {education.map(e => (
                  <div key={e.id} className="mb-2">
                    <p className="text-xs font-semibold text-white">{e.degree}</p>
                    <p className="text-[10px] text-white/60">{e.institution}</p>
                    <p className="text-[10px] text-white/50">{e.startDate} — {e.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>
        </div>

        <div className="flex-1 p-5" style={{ gap }}>
          <SectionWrapper visible={c.sectionsVisible.summary}>
            {p.summary && <div style={{ marginBottom: gap }}><h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>About Me</h2><p className="text-xs opacity-70 leading-relaxed">{p.summary}</p></div>}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.experience}>
            {experience.length > 0 && (
              <div style={{ marginBottom: gap }}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>Experience</h2>
                {experience.map(e => (
                  <div key={e.id} className="mb-3 relative pl-3" style={{ borderLeft: `2px solid ${color}` }}>
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full" style={{ background: color }} />
                    <h3 className="font-semibold text-sm">{e.position}</h3>
                    <p className="text-xs opacity-60">{e.company} • {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                    <p className="text-xs opacity-70 mt-1 whitespace-pre-line">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.projects}>
            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>Projects</h2>
                {projects.map(pr => (
                  <div key={pr.id} className="mb-2 p-2 rounded" style={{ background: `${color}08` }}>
                    <h3 className="font-semibold text-sm">{pr.name}</h3>
                    <p className="text-[10px] opacity-50">{pr.technologies}</p>
                    <p className="text-xs opacity-70">{pr.description}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export const DarkTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 14}px`;

  return (
    <div style={{ fontFamily: c.fontFamily, fontSize: `${c.fontSize}px`, background: '#1a1a2e', color: '#e0e0e0' }} className="relative p-5 rounded-lg">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: `1px solid ${color}40` }}>
          {p.photo && <img src={p.photo} alt="" className="w-16 h-16 rounded-lg object-cover" />}
          <div>
            <h1 className="text-xl font-bold" style={{ color }}>{p.fullName || 'Your Name'}</h1>
            <p className="text-sm opacity-60">{p.title}</p>
            <div className="flex flex-wrap gap-3 mt-1 text-xs opacity-50">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.summary}>
        {p.summary && <p className="text-sm opacity-70 mb-4">{p.summary}</p>}
      </SectionWrapper>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-0" style={{ gap }}>
          <SectionWrapper visible={c.sectionsVisible.experience}>
            {experience.length > 0 && (
              <div style={{ marginBottom: gap }}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>Experience</h2>
                {experience.map(e => (
                  <div key={e.id} className="mb-3 p-2 rounded" style={{ background: '#ffffff08' }}>
                    <h3 className="font-semibold text-sm">{e.position}</h3>
                    <p className="text-xs opacity-50">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                    <p className="text-xs opacity-60 mt-1 whitespace-pre-line">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.projects}>
            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>Projects</h2>
                {projects.map(pr => (
                  <div key={pr.id} className="mb-2 p-2 rounded" style={{ background: '#ffffff08' }}>
                    <h3 className="font-semibold text-sm">{pr.name}</h3>
                    <p className="text-[10px] opacity-40">{pr.technologies}</p>
                    <p className="text-xs opacity-60">{pr.description}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>
        </div>

        <div className="space-y-0" style={{ gap }}>
          <SectionWrapper visible={c.sectionsVisible.skills}>
            {skills.length > 0 && (
              <div style={{ marginBottom: gap }}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>Skills</h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => <span key={s.id} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ border: `1px solid ${color}40`, color }}>{s.name}</span>)}
                </div>
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.education}>
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>Education</h2>
                {education.map(e => (
                  <div key={e.id} className="mb-2">
                    <p className="text-xs font-semibold">{e.degree}</p>
                    <p className="text-[10px] opacity-50">{e.institution}</p>
                    <p className="text-[10px] opacity-40">{e.startDate} — {e.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export const ElegantTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 14}px`;

  return (
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: `${c.fontSize}px` }} className="relative">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="text-center mb-6">
          {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2" style={{ borderColor: color }} />}
          <h1 className="text-3xl font-bold tracking-wide">{p.fullName || 'Your Name'}</h1>
          <p className="text-sm tracking-[0.3em] uppercase mt-1 opacity-50" style={{ fontFamily: c.fontFamily }}>{p.title}</p>
          <div className="flex justify-center gap-1 mt-3">
            <span className="w-12 h-px" style={{ background: color }} />
            <span className="w-2 h-2 rounded-full -mt-[3px]" style={{ background: color }} />
            <span className="w-12 h-px" style={{ background: color }} />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs opacity-50" style={{ fontFamily: c.fontFamily }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.summary}>
        {p.summary && <div className="text-center mb-6 px-8"><p className="text-sm italic opacity-70 leading-relaxed" style={{ fontFamily: c.fontFamily }}>{p.summary}</p></div>}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.experience}>
        {experience.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color }}>Experience</h2>
            {experience.map(e => (
              <div key={e.id} className="mb-3 text-center">
                <h3 className="font-semibold text-sm">{e.position}</h3>
                <p className="text-xs opacity-50 italic">{e.company} — {e.startDate} to {e.current ? 'Present' : e.endDate}</p>
                <p className="text-xs opacity-70 mt-1 whitespace-pre-line" style={{ fontFamily: c.fontFamily }}>{e.description}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.education}>
        {education.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color }}>Education</h2>
            {education.map(e => (
              <div key={e.id} className="mb-2 text-center">
                <h3 className="font-semibold text-sm">{e.degree} in {e.field}</h3>
                <p className="text-xs opacity-50 italic">{e.institution} | {e.startDate} — {e.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.skills}>
        {skills.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color }}>Expertise</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map(s => <span key={s.id} className="px-3 py-1 text-xs border rounded-full" style={{ borderColor: `${color}40`, color }}>{s.name}</span>)}
            </div>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.projects}>
        {projects.length > 0 && (
          <div>
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color }}>Projects</h2>
            {projects.map(pr => (
              <div key={pr.id} className="mb-2 text-center">
                <h3 className="font-semibold text-sm">{pr.name}</h3>
                <p className="text-[10px] opacity-40">{pr.technologies}</p>
                <p className="text-xs opacity-70" style={{ fontFamily: c.fontFamily }}>{pr.description}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export const ExecutiveTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 16}px`;

  return (
    <div style={{ fontFamily: c.fontFamily, fontSize: `${c.fontSize}px`, background: '#f8fafc' }} className="relative flex min-h-full">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}
      
      {/* Sidebar */}
      <div className="w-[30%] bg-[#1e293b] text-white p-6 shrink-0">
        <SectionWrapper visible={c.sectionsVisible.personalInfo}>
          {p.photo && <img src={p.photo} alt="" className="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-white/10" />}
          <h1 className="text-xl font-bold leading-tight mb-1">{p.fullName}</h1>
          <p className="text-xs text-slate-400 mb-6">{p.title}</p>
          
          <div className="space-y-3 mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Contact</h2>
            <div className="space-y-2 text-xs text-slate-300">
              {p.email && <p className="flex items-center gap-2"><Mail size={10} className="text-indigo-400" />{p.email}</p>}
              {p.phone && <p className="flex items-center gap-2"><Phone size={10} className="text-indigo-400" />{p.phone}</p>}
              {p.location && <p className="flex items-center gap-2"><MapPin size={10} className="text-indigo-400" />{p.location}</p>}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.skills}>
          {skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Expertise</h2>
              <div className="space-y-3">
                {skills.map(s => (
                  <div key={s.id}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>{s.name}</span>
                      <span className="opacity-50">{s.level * 20}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${s.level * 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionWrapper>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white shadow-xl">
        <SectionWrapper visible={c.sectionsVisible.summary}>
          {p.summary && (
            <div style={{ marginBottom: gap }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-1 rounded-full" style={{ background: color }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color }}>Executive Summary</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">{p.summary}</p>
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.experience}>
          {experience.length > 0 && (
            <div style={{ marginBottom: gap }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-1 rounded-full" style={{ background: color }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color }}>Professional Career</h2>
              </div>
              <div className="space-y-6">
                {experience.map(e => (
                  <div key={e.id} className="relative pl-4 border-l border-slate-100">
                    <div className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-slate-200" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{e.position}</h3>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-full">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{e.company}</p>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.education}>
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-1 rounded-full" style={{ background: color }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color }}>Academic History</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {education.map(e => (
                  <div key={e.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900">{e.degree}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{e.institution}</p>
                    <p className="text-[10px] font-bold text-indigo-500 mt-1">{e.startDate} — {e.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionWrapper>
      </div>
    </div>
  );
};

export const ModernTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 20}px`;

  return (
    <div style={{ fontFamily: c.fontFamily, fontSize: `${c.fontSize}px`, background: 'white' }} className="relative p-10">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="flex justify-between items-start mb-12">
          <div className="flex-1">
            <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color }}>{p.fullName || 'Your Name'}</h1>
            <p className="text-lg font-bold text-slate-400 uppercase tracking-[0.2em]">{p.title}</p>
            <div className="flex gap-4 mt-4 text-xs font-bold text-slate-500">
                {p.email && <span className="flex items-center gap-1"><Mail size={12} className="text-slate-300" />{p.email}</span>}
                {p.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-300" />{p.location}</span>}
            </div>
          </div>
          {p.photo && (
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-2xl">
                <img src={p.photo} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ background: color }}>
                <Star className="text-white w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
           <SectionWrapper visible={c.sectionsVisible.summary}>
            {p.summary && <div style={{ marginBottom: gap }}><p className="text-sm text-slate-600 leading-relaxed font-medium">{p.summary}</p></div>}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.experience}>
            {experience.length > 0 && (
              <div style={{ marginBottom: gap }}>
                <h2 className="text-lg font-black mb-6 flex items-center gap-2" style={{ color }}><Briefcase size={20} /> Experience</h2>
                <div className="space-y-8">
                  {experience.map(e => (
                    <div key={e.id} className="group relative">
                      <div className="flex justify-between mb-1">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">{e.position}</h3>
                        <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-200 transition-colors">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 mb-3">{e.company}</p>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{e.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>
        </div>

        <div className="col-span-4 border-l border-slate-100 pl-10">
          <SectionWrapper visible={c.sectionsVisible.skills}>
            {skills.length > 0 && (
              <div style={{ marginBottom: gap }}>
                <h2 className="text-sm font-black mb-4 uppercase tracking-widest" style={{ color }}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s.id} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 text-slate-600 border border-slate-100">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.education}>
            {education.length > 0 && (
              <div>
                <h2 className="text-sm font-black mb-4 uppercase tracking-widest" style={{ color }}>Education</h2>
                <div className="space-y-4">
                  {education.map(e => (
                    <div key={e.id}>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">{e.degree}</h3>
                      <p className="text-[10px] text-slate-500 mt-1">{e.institution}</p>
                      <p className="text-[10px] font-black mt-1" style={{ color }}>{e.startDate} — {e.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export const SiliconValleyEliteTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 12}px`;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: `${c.fontSize}px`, color: '#1a1a1a' }} className="relative max-w-[800px] mx-auto p-12 bg-white">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="mb-10">
          <h1 className="text-5xl font-black tracking-tighter mb-4" style={{ color: '#000', lineHeight: 1.1 }}>{p.fullName || 'YOUR NAME'}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-widest opacity-40">
            {p.email && <span className="flex items-center gap-2"><Mail size={14} fill="black" className="text-white" /> {p.email}</span>}
            {p.phone && <span className="flex items-center gap-2"><Phone size={14} fill="black" className="text-white" /> {p.phone}</span>}
            {p.location && <span className="flex items-center gap-2"><MapPin size={14} fill="black" className="text-white" /> {p.location}</span>}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.summary}>
        {p.summary && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 border-b-2 pb-1 inline-block" style={{ color }}>Professional Profile</h2>
            <p className="text-[15px] leading-relaxed font-medium text-slate-700">{p.summary}</p>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.experience}>
        {experience.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b-2 pb-1 inline-block" style={{ color }}>Experience</h2>
            <div className="space-y-10">
              {experience.map(e => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-black text-xl text-black tracking-tight">{e.position}</h3>
                    <span className="text-xs font-black opacity-30 uppercase tracking-widest">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                  </div>
                  <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color }}>
                    <Briefcase size={14} /> {e.company}
                  </p>
                  <ul className="text-sm leading-relaxed text-slate-600 font-medium list-disc ml-5 space-y-2">
                    {e.description.split('\n').map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
        <SectionWrapper visible={c.sectionsVisible.skills}>
          {skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b-2 pb-1 inline-block" style={{ color }}>Technological Arsenal</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s.id} className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-sm tracking-widest uppercase">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper visible={c.sectionsVisible.education}>
          {education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b-2 pb-1 inline-block" style={{ color }}>Academic Foundation</h2>
              <div className="space-y-6">
                {education.map(e => (
                  <div key={e.id}>
                    <h3 className="font-black text-sm text-black tracking-tight">{e.degree}</h3>
                    <p className="text-xs font-bold opacity-40 mt-1 uppercase tracking-wider">{e.institution}</p>
                    {e.gpa && <p className="text-[10px] font-black mt-1" style={{ color }}>Honors: {e.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionWrapper>
      </div>
    </div>
  );
};

export const BillionaireTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = '#d4af37'; // Royal Gold
  const bg = '#1a1c23'; // Deep Slate
  const gap = `${c.spacing * 14}px`;

  return (
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: `${c.fontSize}px`, color: '#333' }} className="relative p-12 bg-white">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      {/* Luxury Border Accent */}
      <div className="absolute top-0 left-0 w-full h-3" style={{ background: `linear-gradient(90deg, ${color}, #f9e29d, ${color})` }} />

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="text-center mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-40">Curated Professional Profile</p>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4" style={{ color: '#000' }}>{p.fullName || 'YOUR NAME'}</h1>
          <div className="h-0.5 w-24 mx-auto mb-6" style={{ background: color }} />
          <p className="text-xl font-bold uppercase tracking-[0.2em] mb-6" style={{ color }}>{p.title}</p>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-widest opacity-60">
            {p.email && <span className="flex items-center gap-2"> {p.email}</span>}
            {p.phone && <span>| {p.phone}</span>}
            {p.location && <span>| {p.location}</span>}
          </div>
        </div>
      </SectionWrapper>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-12">
          <SectionWrapper visible={c.sectionsVisible.summary}>
            {p.summary && (
              <div className="relative">
                <div className="absolute -left-6 top-0 w-1 h-full" style={{ background: color, opacity: 0.3 }} />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color }}>The Narrative</h2>
                <p className="text-sm leading-relaxed italic font-medium text-slate-700">{p.summary}</p>
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.experience}>
            {experience.length > 0 && (
              <div style={{ marginBottom: gap }}>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b pb-2" style={{ color }}>Strategic Leadership</h2>
                <div className="space-y-10">
                  {experience.map(e => (
                    <div key={e.id}>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-black text-xl text-black uppercase tracking-tight">{e.company}</h3>
                        <span className="text-[11px] font-black opacity-30 uppercase tracking-[0.2em]">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                      </div>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 opacity-50" style={{ color }}>{e.position}</p>
                      <ul className="text-sm leading-relaxed text-slate-600 space-y-3">
                        {e.description.split('\n').map((line, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>
        </div>

        <div className="col-span-4 space-y-12">
          <SectionWrapper visible={c.sectionsVisible.skills}>
            {skills.length > 0 && (
              <div className="bg-slate-50 p-8 rounded-sm border-t-4" style={{ borderColor: color }}>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8" style={{ color }}>Core Assets</h2>
                <div className="space-y-6">
                  {skills.map(s => (
                    <div key={s.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest">{s.name}</span>
                      </div>
                      <div className="h-[3px] w-full bg-slate-200">
                        <div className="h-full" style={{ background: color, width: '100%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper visible={c.sectionsVisible.education}>
            {education.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color }}>Foundations</h2>
                {education.map(e => (
                  <div key={e.id}>
                    <h3 className="font-black text-sm text-black tracking-tight uppercase mb-1">{e.degree}</h3>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-wider mb-2">{e.institution}</p>
                    <p className="text-[10px] font-black tracking-widest opacity-30">{e.startDate} — {e.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export const WallStreetTemplate = ({ data, watermark }: Props) => {
  const { personalInfo: p, skills, education, experience, projects, customization: c } = data;
  const color = c.primaryColor;
  const gap = `${c.spacing * 14}px`;

  return (
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: `${c.fontSize}px`, color: '#000' }} className="relative p-12 bg-white">
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 rotate-[-30deg]">
          <span className="text-6xl font-bold tracking-widest" style={{ color }}>PREVIEW</span>
        </div>
      )}

      <SectionWrapper visible={c.sectionsVisible.personalInfo}>
        <div className="text-center mb-12 border-b-8 border-black pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{p.fullName || 'YOUR NAME'}</h1>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] opacity-40 mt-4">
            {p.email && <span className="flex items-center gap-2">{p.email}</span>}
            {p.phone && <span>| {p.phone}</span>}
            {p.location && <span>| {p.location}</span>}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.summary}>
        {p.summary && (
          <div className="mb-12 text-justify bg-slate-50 p-6 border-l-8" style={{ borderColor: color }}>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color }}>Strategic Profile</h2>
            <p className="text-sm leading-relaxed italic font-medium opacity-80">{p.summary}</p>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper visible={c.sectionsVisible.experience}>
        {experience.length > 0 && (
          <div style={{ marginBottom: gap }}>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b-2 pb-2" style={{ color, borderColor: `${color}20` }}>Professional Tenure</h2>
            <div className="space-y-12">
              {experience.map(e => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-extrabold text-xl">{e.company}</h3>
                    <span className="text-[11px] font-black opacity-30 uppercase tracking-[0.2em]">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-50" style={{ color }}>{e.position}</p>
                  <ul className="text-sm leading-relaxed opacity-90 list-disc ml-5 space-y-3 font-medium">
                    {e.description.split('\n').map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <div className="grid grid-cols-12 gap-12 mt-12 pt-12 border-t border-black">
        <div className="col-span-7">
          <SectionWrapper visible={c.sectionsVisible.education}>
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6" style={{ color }}>Academic Pedigree</h2>
                <div className="space-y-8">
                  {education.map(e => (
                    <div key={e.id}>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-black text-sm tracking-wide uppercase">{e.institution}</h3>
                        <span className="text-[11px] font-black opacity-30 tracking-widest">{e.startDate}</span>
                      </div>
                      <p className="text-sm font-bold italic opacity-60">{e.degree} in {e.field} {e.gpa && `| Honors: ${e.gpa}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>
        </div>
        
        <div className="col-span-5 bg-slate-900 text-white p-8">
           <SectionWrapper visible={c.sectionsVisible.skills}>
            {skills.length > 0 && (
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-indigo-400">Core Asset Portfolio</h2>
                <div className="space-y-4">
                  {skills.map(s => (
                    <div key={s.id} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">{s.name}</span>
                        <span className="text-[9px] font-black opacity-30 uppercase text-indigo-200">Expert</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/10">
                        <div className="h-full bg-indigo-500" style={{ width: '100%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

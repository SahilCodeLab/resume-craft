import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Star } from 'lucide-react';

interface Props {
  data: ResumeData;
  watermark?: boolean;
}

const SectionWrapper = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => {
  if (!visible) return null;
  return <>{children}</>;
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

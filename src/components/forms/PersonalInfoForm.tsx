import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { User, Camera } from 'lucide-react';

const PersonalInfoForm = () => {
  const { data, updatePersonalInfo } = useResume();
  const { personalInfo } = data;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonalInfo('photo', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-premium">
            {personalInfo.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-slate-200" />
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full premium-button flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
            <Camera className="w-4 h-4 text-white" />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Professional Photo</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-[180px]">Upload a clear, formal photo to make your resume stand out.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Full Name</Label>
          <Input 
            value={personalInfo.fullName} 
            onChange={e => updatePersonalInfo('fullName', e.target.value)} 
            placeholder="e.g. Johnathan Doe" 
            className="h-12 border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Job Title</Label>
          <Input 
            value={personalInfo.title} 
            onChange={e => updatePersonalInfo('title', e.target.value)} 
            placeholder="e.g. Senior Product Designer" 
            className="h-12 border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Email Address</Label>
          <Input 
            value={personalInfo.email} 
            onChange={e => updatePersonalInfo('email', e.target.value)} 
            placeholder="john@example.com" 
            className="h-12 border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Phone Number</Label>
          <Input 
            value={personalInfo.phone} 
            onChange={e => updatePersonalInfo('phone', e.target.value)} 
            placeholder="+1 (555) 000-0000" 
            className="h-12 border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Location</Label>
          <Input 
            value={personalInfo.location} 
            onChange={e => updatePersonalInfo('location', e.target.value)} 
            placeholder="City, Country" 
            className="h-12 border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Website / Portfolio</Label>
          <Input 
            value={personalInfo.website} 
            onChange={e => updatePersonalInfo('website', e.target.value)} 
            placeholder="https://portfolio.me" 
            className="h-12 border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Professional Summary</Label>
        <Textarea 
          value={personalInfo.summary} 
          onChange={e => updatePersonalInfo('summary', e.target.value)} 
          placeholder="Briefly describe your career goals and key achievements..." 
          rows={5} 
          className="border-slate-100 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl resize-none p-4" 
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;

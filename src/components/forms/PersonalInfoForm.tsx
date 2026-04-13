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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-border">
            {personalInfo.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <label className="absolute inset-0 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="w-5 h-5 text-primary-foreground" />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Profile Photo</p>
          <p className="text-xs text-muted-foreground">Upload a professional headshot</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</Label>
          <Input value={personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} placeholder="John Doe" className="bg-secondary/50 border-border focus:border-primary" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Job Title</Label>
          <Input value={personalInfo.title} onChange={e => updatePersonalInfo('title', e.target.value)} placeholder="Software Engineer" className="bg-secondary/50 border-border focus:border-primary" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
          <Input value={personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} placeholder="john@example.com" className="bg-secondary/50 border-border focus:border-primary" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</Label>
          <Input value={personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} placeholder="+91 98765 43210" className="bg-secondary/50 border-border focus:border-primary" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</Label>
          <Input value={personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} placeholder="Mumbai, India" className="bg-secondary/50 border-border focus:border-primary" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</Label>
          <Input value={personalInfo.website} onChange={e => updatePersonalInfo('website', e.target.value)} placeholder="https://johndoe.com" className="bg-secondary/50 border-border focus:border-primary" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Professional Summary</Label>
        <Textarea value={personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} placeholder="A brief summary of your professional background..." rows={4} className="bg-secondary/50 border-border focus:border-primary resize-none" />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;

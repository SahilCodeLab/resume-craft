import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = () => {
  const { data, addExperience, updateExperience, removeExperience } = useResume();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Button onClick={addExperience} variant="outline" className="w-full border-dashed border-border hover:border-primary hover:bg-primary/5">
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>

      <AnimatePresence>
        {data.experience.map((exp) => (
          <motion.div key={exp.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg bg-secondary/30 border border-border space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-foreground">Experience Entry</h4>
              <Button onClick={() => removeExperience(exp.id)} size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Company</Label>
                <Input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Google" className="bg-card border-border text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Position</Label>
                <Input value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} placeholder="Senior Engineer" className="bg-card border-border text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Start Date</Label>
                <Input value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" className="bg-card border-border text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">End Date</Label>
                <Input value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Present" disabled={exp.current} className="bg-card border-border text-sm" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={exp.current} onCheckedChange={v => updateExperience(exp.id, 'current', !!v)} />
              <Label className="text-xs text-muted-foreground">Currently working here</Label>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Textarea value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} placeholder="Key responsibilities and achievements..." rows={3} className="bg-card border-border text-sm resize-none" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExperienceForm;

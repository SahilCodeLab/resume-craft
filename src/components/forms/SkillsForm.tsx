import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const SkillsForm = () => {
  const { data, addSkill, removeSkill } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a skill (e.g., React, Python)"
          className="bg-secondary/50 border-border focus:border-primary"
        />
        <Button onClick={handleAdd} size="icon" className="shrink-0 gradient-hero">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {data.skills.map(skill => (
            <motion.div
              key={skill.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm font-medium text-foreground group"
            >
              <span>{skill.name}</span>
              <button onClick={() => removeSkill(skill.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No skills added yet. Start typing above to add your skills.
        </p>
      )}
    </motion.div>
  );
};

export default SkillsForm;

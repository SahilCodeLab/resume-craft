import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { data, addProject, updateProject, removeProject } = useResume();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Button onClick={addProject} variant="outline" className="w-full border-dashed border-border hover:border-primary hover:bg-primary/5">
        <Plus className="w-4 h-4 mr-2" /> Add Project
      </Button>

      <AnimatePresence>
        {data.projects.map((proj) => (
          <motion.div key={proj.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg bg-secondary/30 border border-border space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-foreground">Project</h4>
              <Button onClick={() => removeProject(proj.id)} size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Project Name</Label>
                <Input value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} placeholder="E-commerce Platform" className="bg-card border-border text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Technologies</Label>
                <Input value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, MongoDB" className="bg-card border-border text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Link</Label>
              <Input value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} placeholder="https://github.com/..." className="bg-card border-border text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Textarea value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} placeholder="Brief project description..." rows={2} className="bg-card border-border text-sm resize-none" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsForm;

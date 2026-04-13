import { useResume } from '@/contexts/ResumeContext';
import { TEMPLATE_INFO, TemplateName } from '@/types/resume';
import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';

const TemplateSelector = () => {
  const { data, setTemplate, isPaid } = useResume();

  const templates = Object.entries(TEMPLATE_INFO) as [TemplateName, typeof TEMPLATE_INFO[TemplateName]][];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {templates.map(([key, info]) => {
          const isSelected = data.template === key;
          const locked = info.premium && !isPaid;
          return (
            <button
              key={key}
              onClick={() => !locked && setTemplate(key)}
              className={`relative text-left p-4 rounded-lg border-2 transition-all ${
                isSelected ? 'border-primary bg-primary/5 shadow-glow' : 'border-border hover:border-primary/30 bg-card'
              } ${locked ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{info.name}</h4>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </div>
                {locked ? (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                ) : isSelected ? (
                  <div className="w-5 h-5 rounded-full gradient-hero flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                ) : null}
              </div>
              {info.premium && (
                <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-primary">Premium</span>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TemplateSelector;

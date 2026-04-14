import { useResume } from '@/contexts/ResumeContext';
import { TEMPLATE_INFO, TemplateName } from '@/types/resume';
import { motion } from 'framer-motion';
import { Lock, Check, Layout, Crown } from 'lucide-react';
import ResumePreview from './ResumePreview';

const TemplateSelector = () => {
  const { data, setTemplate, isPaid } = useResume();

  const templates = Object.entries(TEMPLATE_INFO) as [TemplateName, typeof TEMPLATE_INFO[TemplateName]][];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {templates.map(([key, info], i) => {
          const isSelected = data.template === key;
          const locked = info.premium && !isPaid;
          
          return (
            <motion.button
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setTemplate(key)}
              className={`relative group rounded-2xl border-2 transition-all duration-300 overflow-hidden text-left ${
                isSelected 
                  ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg' 
                  : 'border-slate-100 hover:border-indigo-200 bg-white'
              }`}
            >
              <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden">
                {/* Mini Preview */}
                <div className="absolute inset-0 scale-[0.35] origin-top translate-y-2 pointer-events-none transform-gpu group-hover:scale-[0.37] transition-transform duration-500">
                  <div className="bg-white shadow-2xl rounded-sm">
                    {/* We provide a specialized version or just use the preview with fake data if possible */}
                    <ResumePreview watermark={false} />
                  </div>
                </div>

                {/* Locked State UI */}
                {locked && (
                  <div className="absolute inset-0 z-10 backdrop-blur-[3px] bg-slate-900/40 flex flex-col items-center justify-center p-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 border border-white/30 group-hover:scale-110 transition-transform">
                      <Lock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-white drop-shadow-md">Unlock Premium</span>
                  </div>
                )}

                {isSelected && !locked && (
                    <div className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
                        <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                )}

                {info.premium && (
                    <div className={`absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${locked ? 'bg-yellow-400 text-black' : 'bg-indigo-600 text-white'}`}>
                        <Crown size={10} fill="currentColor" /> Premium
                    </div>
                )}
              </div>

              <div className="p-3 bg-white">
                <h4 className="text-[11px] font-black uppercase tracking-[0.05em] text-slate-900 truncate leading-none">{info.name}</h4>
                <p className="text-[9px] text-slate-500 mt-1 line-clamp-1 font-medium italic">"{info.description}"</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TemplateSelector;

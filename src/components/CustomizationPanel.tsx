import { useResume } from '@/contexts/ResumeContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FONT_OPTIONS } from '@/types/resume';
import { motion } from 'framer-motion';

const CustomizationPanel = () => {
  const { data, updateCustomization } = useResume();
  const { customization } = data;

  const colors = ['#d97706', '#2563eb', '#059669', '#dc2626', '#7c3aed', '#0891b2', '#be123c', '#4f46e5'];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Accent Color</Label>
        <div className="flex gap-2 flex-wrap">
          {colors.map(c => (
            <button key={c} onClick={() => updateCustomization({ primaryColor: c })}
              className={`w-8 h-8 rounded-full border-2 transition-all ${customization.primaryColor === c ? 'border-foreground scale-110' : 'border-transparent'}`}
              style={{ background: c }} />
          ))}
          <Input type="color" value={customization.primaryColor} onChange={e => updateCustomization({ primaryColor: e.target.value })}
            className="w-8 h-8 p-0 border-0 rounded-full cursor-pointer" />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Font Family</Label>
        <div className="grid grid-cols-1 gap-1.5">
          {FONT_OPTIONS.map(f => (
            <button key={f.value} onClick={() => updateCustomization({ fontFamily: f.value })}
              className={`text-left px-3 py-2 rounded-md text-sm transition-all ${customization.fontFamily === f.value ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}
              style={{ fontFamily: f.value }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Font Size: {customization.fontSize}px</Label>
        <Slider value={[customization.fontSize]} onValueChange={v => updateCustomization({ fontSize: v[0] })} min={10} max={18} step={1} className="w-full" />
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Spacing</Label>
        <Slider value={[customization.spacing]} onValueChange={v => updateCustomization({ spacing: v[0] })} min={0.5} max={2} step={0.1} className="w-full" />
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Toggle Sections</Label>
        <div className="space-y-2">
          {Object.entries(customization.sectionsVisible).map(([key, visible]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm capitalize text-foreground">{key === 'personalInfo' ? 'Header' : key}</span>
              <Switch checked={visible} onCheckedChange={v => updateCustomization({ sectionsVisible: { ...customization.sectionsVisible, [key]: v } })} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CustomizationPanel;

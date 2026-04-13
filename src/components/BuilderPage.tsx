import { useResume } from '@/contexts/ResumeContext';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, GraduationCap, Briefcase, Code, Palette, Layout, Download, ChevronLeft, ChevronRight, Sparkles, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SkillsForm from '@/components/forms/SkillsForm';
import EducationForm from '@/components/forms/EducationForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import CustomizationPanel from '@/components/CustomizationPanel';
import TemplateSelector from '@/components/TemplateSelector';
import ResumePreview from '@/components/ResumePreview';
import { toast } from 'sonner';

const steps = [
  { label: 'Personal', icon: User },
  { label: 'Skills', icon: Star },
  { label: 'Education', icon: GraduationCap },
  { label: 'Experience', icon: Briefcase },
  { label: 'Projects', icon: Code },
  { label: 'Templates', icon: Layout },
  { label: 'Customize', icon: Palette },
];

const BuilderPage = () => {
  const { currentStep, setCurrentStep, isPaid, setIsPaid } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (free = false) => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(previewRef.current).save();
      if (!free) setIsPaid(true);
      setShowSuccess(true);
      toast.success('Resume downloaded successfully! 🎉');
    } catch {
      toast.error('Failed to generate PDF');
    }
    setDownloading(false);
  };

  const handlePaidDownload = () => {
    toast.info('Razorpay integration requires API keys. Downloading free version for demo.');
    handleDownload(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfoForm />;
      case 1: return <SkillsForm />;
      case 2: return <EducationForm />;
      case 3: return <ExperienceForm />;
      case 4: return <ProjectsForm />;
      case 5: return <TemplateSelector />;
      case 6: return <CustomizationPanel />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">ResumeForge</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 1000+ resumes created</span>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 border-r border-border bg-card">
          {/* Step Navigation */}
          <div className="border-b border-border p-3">
            <div className="flex gap-1 overflow-x-auto pb-1">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const active = i === currentStep;
                const done = i < currentStep;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      active ? 'gradient-hero text-primary-foreground shadow-glow' : done ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <h2 className="text-lg font-bold text-foreground mb-1">{steps[currentStep].label}</h2>
                <p className="text-xs text-muted-foreground mb-5">Fill in your {steps[currentStep].label.toLowerCase()} details</p>
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-border">
              <Button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                variant="outline"
                disabled={currentStep === 0}
                className="text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)} className="text-xs gradient-hero text-primary-foreground">
                  Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Button onClick={() => setShowSuccess(true)} className="text-xs gradient-hero text-primary-foreground">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Finish
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-muted/30" style={{ maxHeight: 'calc(100vh - 56px)' }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
            <div className="flex gap-2">
              <Button onClick={() => handleDownload(true)} variant="outline" size="sm" className="text-xs" disabled={downloading}>
                <Download className="w-3 h-3 mr-1" /> Free (Watermark)
              </Button>
              <Button onClick={handlePaidDownload} size="sm" className="text-xs gradient-hero text-primary-foreground shadow-glow" disabled={downloading}>
                <Download className="w-3 h-3 mr-1" /> Download PDF (₹29)
              </Button>
            </div>
          </div>

          <div className="transform origin-top scale-[0.65] lg:scale-[0.75] xl:scale-[0.85]">
            <ResumePreview watermark={!isPaid} previewRef={previewRef} />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-8 max-w-sm mx-4 text-center shadow-elevated" onClick={e => e.stopPropagation()}>
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-foreground mb-2">Your Resume is Ready!</h2>
              <p className="text-sm text-muted-foreground mb-6">Download your professionally crafted resume now.</p>
              <div className="space-y-2">
                <Button onClick={handlePaidDownload} className="w-full gradient-hero text-primary-foreground" disabled={downloading}>
                  <Download className="w-4 h-4 mr-2" /> Premium Download — ₹29
                </Button>
                <p className="text-[10px] text-muted-foreground">🔥 Limited time offer • No watermark • High quality PDF</p>
                <Button onClick={() => { handleDownload(true); setShowSuccess(false); }} variant="ghost" className="w-full text-xs text-muted-foreground" disabled={downloading}>
                  Download free version (with watermark)
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuilderPage;

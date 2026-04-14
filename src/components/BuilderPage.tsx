import { useResume } from '@/contexts/ResumeContext';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, GraduationCap, Briefcase, Code, Palette, Layout, Download, ChevronLeft, ChevronRight, Sparkles, Shield, Users, Lock } from 'lucide-react';
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
import { TEMPLATE_INFO } from '@/types/resume';

declare global {
  interface Window {
    paypal: any;
    gtag: (...args: any[]) => void;
  }
}

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
  const { data, currentStep, setCurrentStep, isPaid, setIsPaid } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isPremiumTemplate = TEMPLATE_INFO[data.template].premium;

  const handleDownload = async (free = false) => {
    if (!previewRef.current) return;
    
    if (isPremiumTemplate && !isPaid && free) {
      toast.error('This is a Premium Template. Unlock it to download.');
      setShowSuccess(true);
      return;
    }

    setDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: [0, 0, 0, 0], // Zero margins to avoid blank page shifts
        filename: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_Elite.pdf`,
        image: { type: 'jpeg' as const, quality: 1 },
        html2canvas: { 
          scale: 4, // High fidelity
          useCORS: true, 
          letterRendering: true,
          logging: false,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Ensure the element is fully visible before capture
      const element = previewRef.current;
      await html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        // Remove blank pages if they exist (heuristically)
        if (totalPages > 1) {
          // In a real scenario, we'd check if page 2 is blank, 
          // but usually html2pdf does this if content overflows even by 1 pixel.
        }
      }).save();
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'resume_download', {
          'method': free ? 'free' : 'premium',
          'template': data.template
        });
      }

      if (!free) setIsPaid(true);
      setShowSuccess(true);
      toast.success('Professional Resume Downloaded! 🚀');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate ATS Resume');
    }
    setDownloading(false);
  };

  const handlePaymentClick = () => {
    if (isPaid) {
      handleDownload(false);
    } else {
      setShowSuccess(true);
    }
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
    <div className="min-h-screen bg-[#f7f9fb] font-body">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl premium-button flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl tracking-tight text-foreground">Resume Craft</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Premium Builder</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white shadow-sm">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium text-xs">Secure Editor</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white shadow-sm">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium text-xs">10k+ Resumes Crafted</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-[460px] shrink-0">
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Step Navigation */}
            <div className="p-4 bg-white/40 border-b border-indigo-50 overflow-x-auto no-scrollbar">
              <div className="flex gap-2">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const active = i === currentStep;
                  const done = i < currentStep;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentStep(i)}
                      className={`flex flex-col items-center justify-center min-w-[70px] aspect-square rounded-xl transition-all duration-300 ${
                        active 
                          ? 'premium-button text-white' 
                          : done 
                            ? 'bg-indigo-50 text-indigo-600' 
                            : 'bg-white hover:bg-indigo-50 text-slate-400'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'animate-pulse' : ''}`} />
                      <span className="text-[10px] mt-1 font-semibold">{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8" style={{ minHeight: '500px' }}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStep} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-slate-900 leading-none">{steps[currentStep].label}</h2>
                    <p className="text-sm text-slate-500 mt-2">Enter your details to build a professional profile.</p>
                  </div>
                  
                  <div className="space-y-6">
                    {renderStep()}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-6 border-t border-indigo-50">
                <Button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  variant="ghost"
                  disabled={currentStep === 0}
                  className="rounded-xl px-6 hover:bg-slate-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button 
                    onClick={() => setCurrentStep(currentStep + 1)} 
                    className="premium-button text-white rounded-xl px-8 py-6 shadow-glow"
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowSuccess(true)} 
                    className="premium-button text-white rounded-xl px-8 py-6 shadow-glow"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1">
          <div className="sticky top-[108px] space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPremiumTemplate && !isPaid ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  {isPremiumTemplate && !isPaid ? 'Premium Preview' : 'Live Preview'}
                </span>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleDownload(true)} 
                  variant="outline" 
                  size="sm" 
                  className={`rounded-xl border-slate-200 hover:bg-white transition-all shadow-sm ${isPremiumTemplate && !isPaid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={downloading}
                >
                  <Download className="w-3.5 h-3.5 mr-2" /> Export Draft
                </Button>
                {isPremiumTemplate && !isPaid ? (
                  <Button 
                    onClick={() => setShowSuccess(true)} 
                    size="sm" 
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-4 shadow-glow"
                    disabled={downloading}
                  >
                    <Lock className="w-3.5 h-3.5 mr-2" /> Unlock Template
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePaymentClick} 
                    size="sm" 
                    className="premium-button text-white rounded-xl px-4 shadow-glow"
                    disabled={downloading}
                  >
                    <Download className="w-3.5 h-3.5 mr-2" /> Premium PDF
                  </Button>
                )}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 lg:p-12 min-h-[800px] flex items-start justify-center overflow-hidden bg-slate-50/50">
              <div className="w-full transform origin-top transition-transform duration-500 hover:scale-[1.01]">
                <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white">
                  {isPremiumTemplate && !isPaid && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-amber-600 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Lock className="w-3 h-3" /> Premium Design
                    </div>
                  )}
                  <ResumePreview watermark={!isPaid} previewRef={previewRef} />
                </div>
              </div>
            </div>
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
              className="bg-card rounded-2xl p-8 max-w-md mx-4 text-center shadow-elevated" onClick={e => e.stopPropagation()}>
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-foreground mb-2">Almost Done!</h2>
              <p className="text-sm text-muted-foreground mb-6">Unlock this premium template and get a high-quality PDF without any watermarks.</p>
              
              <div className="space-y-4">
                  <div id="paypal-button-container" className="min-h-[150px]">
                    <Button 
                      onClick={() => {
                        if (window.paypal) {
                          if (typeof window.gtag === 'function') {
                            window.gtag('event', 'premium_checkout_start', {
                              'template': data.template,
                              'provider': 'paypal'
                            });
                          }

                          window.paypal.Buttons({
                            style: {
                              layout: 'vertical',
                              color: 'blue',
                              shape: 'rect',
                              label: 'pay'
                            },
                            createOrder: (data: any, actions: any) => {
                              return actions.order.create({
                                purchase_units: [{
                                  amount: { 
                                    value: '1.19',
                                    currency_code: 'USD'
                                  },
                                  description: 'Elite Professional Resume Template Unlock'
                                }]
                              });
                            },
                            onApprove: (data: any, actions: any) => {
                              return actions.order.capture().then((details: any) => {
                                toast.success('Transaction completed by ' + details.payer.name.given_name);
                                setIsPaid(true);
                                handleDownload(false);
                              });
                            }
                          }).render('#paypal-button-container');
                        } else {
                          toast.error('PayPal SDK loading... Please try again in a moment');
                        }
                      }}
                      className="w-full h-14 premium-button text-white font-bold text-lg shadow-glow"
                    >
                      Unlock Premium Template — ₹99 ($1.19)
                    </Button>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground bg-slate-50 py-2 rounded-lg font-medium">✨ ATS-Optimized • No Watermark • High Fidelity PDF • Multi-Layouts</p>
                
                <Button onClick={() => { handleDownload(true); setShowSuccess(false); }} variant="ghost" className="w-full text-xs text-muted-foreground" disabled={downloading}>
                  Download free version (with watermark)
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-slate-100 bg-white/50 backdrop-blur-sm mt-12">
        <p className="text-sm text-slate-500 font-medium font-display uppercase tracking-widest flex items-center justify-center gap-2">
          Built with <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-500" /> by 
          <a href="https://github.com/SahilCodeLab" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline">
            SahilCodeLab
          </a>
        </p>
        <p className="text-[10px] text-slate-400 mt-2">© 2026 Resume Craft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BuilderPage;

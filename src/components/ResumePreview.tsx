import { useResume } from '@/contexts/ResumeContext';
import { MinimalTemplate, CorporateTemplate, CreativeTemplate, DarkTemplate, ElegantTemplate, ExecutiveTemplate, ModernTemplate, SiliconValleyEliteTemplate, WallStreetTemplate, BillionaireTemplate } from '@/components/templates/ResumeTemplates';
import { useRef } from 'react';

interface Props {
  watermark?: boolean;
  previewRef?: React.RefObject<HTMLDivElement>;
}

const ResumePreview = ({ watermark = true, previewRef }: Props) => {
  const { data } = useResume();
  const localRef = useRef<HTMLDivElement>(null);
  const ref = previewRef || localRef;

  const templateMap = {
    minimal: MinimalTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
    dark: DarkTemplate,
    elegant: ElegantTemplate,
    executive: ExecutiveTemplate,
    modern: ModernTemplate,
    silicon: SiliconValleyEliteTemplate,
    wallstreet: WallStreetTemplate,
    billionaire: BillionaireTemplate,
  };

  const Template = templateMap[data.template];

  return (
    <div className="w-full flex justify-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="bg-card shadow-elevated rounded-lg overflow-hidden"
        style={{ width: '210mm', minHeight: '297mm', padding: '15mm', maxWidth: '100%' }}
      >
        <Template data={data} watermark={watermark} />
      </div>
    </div>
  );
};

export default ResumePreview;

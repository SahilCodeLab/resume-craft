import { ResumeProvider } from '@/contexts/ResumeContext';
import BuilderPage from '@/components/BuilderPage';

const Index = () => {
  return (
    <ResumeProvider>
      <BuilderPage />
    </ResumeProvider>
  );
};

export default Index;


import { useAssessment } from '@/contexts/AssessmentContext';
import { Home, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { currentPhase, setCurrentPhase, resetAssessment } = useAssessment();

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="text-primary w-8 h-8">
          <BarChart3 size={32} />
        </div>
        <span className="text-xl font-bold text-primary">Agile Learner</span>
      </div>
      
      <div className="flex space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPhase('landing')}
          className="flex items-center space-x-1"
        >
          <Home size={18} />
          <span>Home</span>
        </Button>
        
        {currentPhase === 'results' && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetAssessment}
          >
            Start New Assessment
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

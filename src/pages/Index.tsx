
import { useAssessment } from '@/contexts/AssessmentContext';
import Navbar from '@/components/Navbar';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';
import ResultsView from '@/components/results/ResultsView';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { currentPhase, setCurrentPhase } = useAssessment();

  const renderLanding = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-light to-white p-4"
      >
        <div className="text-center max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <div className="typing-container font-fira">
              How fast can your curiosity outpace obsolescence?
            </div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg mb-8 text-neutral-dark"
          >
            Measure your learning agility and discover strategies to thrive in rapidly evolving tech fields
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              onClick={() => setCurrentPhase('onboarding')} 
              size="lg"
              className="group"
            >
              Start Your Assessment
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
            >
              Learn More
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-16 flex gap-8 justify-center"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5 min</div>
              <div className="text-sm text-neutral-dark">Assessment Time</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-neutral-dark">Agility Dimensions</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">∞</div>
              <div className="text-sm text-neutral-dark">Growth Potential</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentPhase !== 'landing' && <Navbar />}
      
      <main className="flex-grow">
        {currentPhase === 'landing' && renderLanding()}
        {currentPhase === 'onboarding' && <OnboardingFlow />}
        {currentPhase === 'assessment' && <AssessmentFlow />}
        {currentPhase === 'results' && <ResultsView />}
      </main>
    </div>
  );
};

export default Index;

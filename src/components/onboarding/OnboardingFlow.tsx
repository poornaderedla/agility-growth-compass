
import { useState } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import SliderQuestion from './SliderQuestion';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const OnboardingFlow = () => {
  const { onboardingQuestions, setCurrentPhase } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleNext = () => {
    if (currentQuestionIndex < onboardingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to assessment phase
      setCurrentPhase('assessment');
    }
  };
  
  const renderProgress = () => {
    return (
      <div className="progress-tree">
        {onboardingQuestions.map((_, index) => (
          <div key={index}>
            <div 
              className="progress-branch" 
              style={{
                left: `${(index / (onboardingQuestions.length - 1)) * 100}%`,
                width: index < onboardingQuestions.length - 1 ? `${100 / (onboardingQuestions.length - 1)}%` : '0',
                opacity: index < currentQuestionIndex ? 1 : 0.3
              }}
            />
            <div 
              className={`progress-node ${index <= currentQuestionIndex ? 'active' : ''}`} 
              style={{
                left: `${(index / (onboardingQuestions.length - 1)) * 100}%`,
              }}
            />
            <div 
              className="progress-label" 
              style={{
                left: `${(index / (onboardingQuestions.length - 1)) * 100}%`,
              }}
            >
              {index === 0 ? 'Start' : index === onboardingQuestions.length - 1 ? 'Ready' : `Q${index}`}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const currentQuestion = onboardingQuestions[currentQuestionIndex];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">Let's get to know you</h2>
        <p className="text-neutral-dark">
          Before we begin, let's understand your learning context
        </p>
      </motion.div>
      
      {renderProgress()}
      
      <div className="mt-8">
        {currentQuestion.type === 'slider' && (
          <SliderQuestion 
            question={currentQuestion} 
            onNext={handleNext} 
          />
        )}
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentPhase('landing')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;

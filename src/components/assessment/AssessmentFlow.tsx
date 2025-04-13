
import { useState } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import QuestionCard from './QuestionCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AssessmentFlow = () => {
  const { assessmentQuestions, calculateResults } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate and show results
      calculateResults();
    }
  };
  
  const renderProgress = () => {
    return (
      <div className="progress-tree">
        {assessmentQuestions.map((_, index) => (
          <div key={index}>
            <div 
              className="progress-branch" 
              style={{
                left: `${(index / (assessmentQuestions.length - 1)) * 100}%`,
                width: index < assessmentQuestions.length - 1 ? `${100 / (assessmentQuestions.length - 1)}%` : '0',
                opacity: index < currentQuestionIndex ? 1 : 0.3
              }}
            />
            <div 
              className={`progress-node ${index <= currentQuestionIndex ? 'active' : ''}`} 
              style={{
                left: `${(index / (assessmentQuestions.length - 1)) * 100}%`,
              }}
            />
            <div 
              className="progress-label" 
              style={{
                left: `${(index / (assessmentQuestions.length - 1)) * 100}%`,
              }}
            >
              {index === 0 ? 'Start' : index === assessmentQuestions.length - 1 ? 'Final' : `Q${index}`}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">Agility Assessment</h2>
        <p className="text-neutral-dark">
          Let's explore how you respond to learning challenges
        </p>
      </motion.div>
      
      {renderProgress()}
      
      <div className="mt-8">
        <QuestionCard 
          question={currentQuestion} 
          onNext={handleNext} 
        />
        
        <div className="mt-6 text-center text-sm text-neutral-dark">
          <p>Question {currentQuestionIndex + 1} of {assessmentQuestions.length}</p>
          <p className="italic mt-2">Remember, there are no right or wrong answers!</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;

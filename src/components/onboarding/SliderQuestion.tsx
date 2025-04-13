
import { useState, useEffect } from 'react';
import { Question, Answer, useAssessment } from '@/contexts/AssessmentContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SliderQuestionProps {
  question: Question;
  onNext: () => void;
}

const SliderQuestion = ({ question, onNext }: SliderQuestionProps) => {
  const { addAnswer, answers } = useAssessment();
  const [value, setValue] = useState<number>(
    // Get existing answer or default to middle value
    (answers.find(a => a.questionId === question.id)?.value as number) || 
    (question.min && question.max ? Math.floor((question.min + question.max) / 2) : 3)
  );
  
  const handleChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };
  
  const handleNext = () => {
    addAnswer({
      questionId: question.id,
      value: value
    });
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-6">{question.question}</h3>
      
      <div className="mb-8">
        <Slider
          defaultValue={[value]}
          min={question.min || 1}
          max={question.max || 5}
          step={1}
          onValueChange={handleChange}
          className="my-6"
        />
        
        <div className="emoji-scale">
          {question.emoji?.map((emoji, index) => (
            <div 
              key={index} 
              className={`emoji-scale-item ${index + (question.min || 1) === value ? 'active' : ''}`}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs mt-1">
                {index === 0 ? question.minLabel : index === (question.emoji?.length || 0) - 1 ? question.maxLabel : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default SliderQuestion;

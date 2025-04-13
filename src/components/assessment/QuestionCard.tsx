
import { useState } from 'react';
import { Question, Answer, useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
}

const QuestionCard = ({ question, onNext }: QuestionCardProps) => {
  const { addAnswer, answers } = useAssessment();
  
  // Get existing answer if available
  const existingAnswer = answers.find(a => a.questionId === question.id);
  
  // State for different question types
  const [situationalAnswer, setSituationalAnswer] = useState<string>(
    (existingAnswer?.value as string) || ''
  );
  const [behavioralAnswer, setBehavioralAnswer] = useState<number>(
    (existingAnswer?.value as number) || 
    (question.min && question.max ? Math.floor((question.min + question.max) / 2) : 3)
  );
  const [tradeoffAnswer, setTradeoffAnswer] = useState<number[]>(
    (existingAnswer?.value as number[]) || [5, 5]
  );
  
  const handleNext = () => {
    let value: string | number | number[];
    
    switch (question.type) {
      case 'situational':
        value = situationalAnswer;
        break;
      case 'behavioral':
        value = behavioralAnswer;
        break;
      case 'tradeoff':
        value = tradeoffAnswer;
        break;
      default:
        value = '';
    }
    
    addAnswer({
      questionId: question.id,
      value
    });
    onNext();
  };
  
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'situational':
        return (
          <div className="mt-4 mb-6">
            <RadioGroup
              value={situationalAnswer}
              onValueChange={setSituationalAnswer}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
        
      case 'behavioral':
        return (
          <div className="mt-6 mb-6">
            <Slider
              defaultValue={[behavioralAnswer]}
              min={question.min || 1}
              max={question.max || 5}
              step={1}
              onValueChange={(val) => setBehavioralAnswer(val[0])}
              className="my-6"
            />
            
            <div className="emoji-scale">
              {question.emoji?.map((emoji, index) => (
                <div 
                  key={index} 
                  className={`emoji-scale-item ${index + (question.min || 1) === behavioralAnswer ? 'active' : ''}`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs mt-1">
                    {index === 0 ? question.minLabel : index === (question.emoji?.length || 0) - 1 ? question.maxLabel : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'tradeoff':
        const total = 10;
        return (
          <div className="mt-6 mb-6">
            <p className="text-sm text-center mb-2">Allocate 10 points between these priorities</p>
            
            <div className="flex items-center mb-4">
              <div className="w-36 text-right mr-3">{question.options?.[0]}</div>
              <div className="flex-grow">
                <Slider
                  defaultValue={[tradeoffAnswer[0]]}
                  min={0}
                  max={total}
                  step={1}
                  onValueChange={(val) => {
                    const newValue = val[0];
                    setTradeoffAnswer([newValue, total - newValue]);
                  }}
                  className="my-2"
                />
              </div>
              <div className="w-36 ml-3">{question.options?.[1]}</div>
            </div>
            
            <div className="flex justify-between">
              <div className="text-center">
                <div className="font-bold text-lg">{tradeoffAnswer[0]}</div>
                <div className="text-xs">points</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{tradeoffAnswer[1]}</div>
                <div className="text-xs">points</div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="energy-bar mb-6">
        <div className="energy-bar-fill" style={{ width: '70%' }}></div>
      </div>
      
      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
      
      {renderQuestionContent()}
      
      <div className="flex justify-between mt-4">
        <Button variant="ghost" size="sm">
          Pause & Reflect
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={(question.type === 'situational' && !situationalAnswer)}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;

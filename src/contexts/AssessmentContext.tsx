
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export type QuestionType = 'slider' | 'situational' | 'behavioral' | 'tradeoff';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  emoji?: string[];
}

export interface Answer {
  questionId: string;
  value: number | string | number[];
}

interface AssessmentContextType {
  currentPhase: 'landing' | 'onboarding' | 'assessment' | 'results';
  setCurrentPhase: (phase: 'landing' | 'onboarding' | 'assessment' | 'results') => void;
  onboardingQuestions: Question[];
  assessmentQuestions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  resetAssessment: () => void;
  results: {
    curiosity: number;
    resilience: number;
    feedbackSensitivity: number;
    experimentation: number;
  };
  calculateResults: () => void;
}

const defaultContext: AssessmentContextType = {
  currentPhase: 'landing',
  setCurrentPhase: () => {},
  onboardingQuestions: [],
  assessmentQuestions: [],
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  answers: [],
  addAnswer: () => {},
  resetAssessment: () => {},
  results: {
    curiosity: 0,
    resilience: 0,
    feedbackSensitivity: 0,
    experimentation: 0,
  },
  calculateResults: () => {},
};

// Sample onboarding questions
const sampleOnboardingQuestions: Question[] = [
  {
    id: 'onboard-1',
    type: 'slider',
    question: 'Rate your comfort with unknown technologies:',
    min: 1,
    max: 5,
    minLabel: 'Panic',
    maxLabel: 'Thrive',
    emoji: ['😰', '😕', '😐', '🙂', '😄']
  },
  {
    id: 'onboard-2',
    type: 'slider',
    question: 'How quickly do you adapt to changing requirements?',
    min: 1,
    max: 5,
    minLabel: 'Slowly',
    maxLabel: 'Quickly',
    emoji: ['🐢', '🚶', '🏃', '🚴', '🚀']
  },
  {
    id: 'onboard-3',
    type: 'slider',
    question: 'How comfortable are you asking for help?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  }
];

// Sample assessment questions
const sampleAssessmentQuestions: Question[] = [
  {
    id: 'assess-1',
    type: 'situational',
    question: 'Your team adopts a new cloud tool with poor documentation. What\'s your first step?',
    options: [
      'Trial-and-error until I figure it out',
      'Find a mentor or colleague who has used it before',
      'Build a basic cheat sheet as I learn',
      'Look for third-party tutorials or courses'
    ]
  },
  {
    id: 'assess-2',
    type: 'behavioral',
    question: 'How often do you seek feedback after failures?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-3',
    type: 'tradeoff',
    question: 'How do you balance these competing priorities?',
    options: [
      'Rapid prototyping',
      'Thorough documentation'
    ]
  },
  {
    id: 'assess-4',
    type: 'situational',
    question: 'When learning a new programming language, what approach do you take?',
    options: [
      'Start with the official documentation and work methodically',
      'Find a simple project and learn by building',
      'Watch video tutorials before trying anything',
      'Adapt patterns from languages I already know'
    ]
  },
  {
    id: 'assess-5',
    type: 'behavioral',
    question: 'After facing a significant technical challenge, how likely are you to reflect on your approach?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  }
];

const AssessmentContext = createContext<AssessmentContextType>(defaultContext);

export const useAssessment = () => useContext(AssessmentContext);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [currentPhase, setCurrentPhase] = useState<'landing' | 'onboarding' | 'assessment' | 'results'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState({
    curiosity: 0,
    resilience: 0,
    feedbackSensitivity: 0,
    experimentation: 0,
  });

  const addAnswer = (answer: Answer) => {
    setAnswers(prev => {
      // Check if we're updating an existing answer
      const existingIndex = prev.findIndex(a => a.questionId === answer.questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingIndex] = answer;
        return newAnswers;
      }
      // Otherwise add a new answer
      return [...prev, answer];
    });
  };

  const resetAssessment = () => {
    setCurrentPhase('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults({
      curiosity: 0,
      resilience: 0,
      feedbackSensitivity: 0,
      experimentation: 0,
    });
  };

  // This function would normally be more sophisticated
  const calculateResults = () => {
    // Simple calculation for demo purposes
    const curiosity = Math.min(Math.floor(Math.random() * 55) + 45, 100);
    const resilience = Math.min(Math.floor(Math.random() * 55) + 45, 100);
    const feedbackSensitivity = Math.min(Math.floor(Math.random() * 55) + 45, 100);
    const experimentation = Math.min(Math.floor(Math.random() * 55) + 45, 100);
    
    setResults({
      curiosity,
      resilience,
      feedbackSensitivity,
      experimentation,
    });

    setCurrentPhase('results');
  };

  return (
    <AssessmentContext.Provider value={{
      currentPhase,
      setCurrentPhase,
      onboardingQuestions: sampleOnboardingQuestions,
      assessmentQuestions: sampleAssessmentQuestions,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      answers,
      addAnswer,
      resetAssessment,
      results,
      calculateResults,
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

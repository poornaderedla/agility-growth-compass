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

// Expanded sample assessment questions (total: 50)
const sampleAssessmentQuestions: Question[] = [
  {
    id: 'assess-1',
    type: 'situational',
    question: "Your team adopts a new cloud tool with poor documentation. What's your first step?",
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
  },
  {
    id: 'assess-6',
    type: 'situational',
    question: 'A stakeholder changes requirements midway. What’s your strategy to realign?',
    options: [
      'Quick meeting to clarify changes',
      'Update project documentation ASAP',
      'Pause and rethink design',
      'Start implementing changes right away'
    ]
  },
  {
    id: 'assess-7',
    type: 'behavioral',
    question: 'How frequently do you review your own code for improvement opportunities?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-8',
    type: 'tradeoff',
    question: 'Which do you prioritize during a deadline crunch?',
    options: [
      'Feature completeness',
      'Bug-free delivery'
    ]
  },
  {
    id: 'assess-9',
    type: 'behavioral',
    question: 'How often do you volunteer to learn new tools for your team?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-10',
    type: 'situational',
    question: 'You encounter a blocker you can’t solve in 2 hours. What next?',
    options: [
      'Ask for help immediately',
      'Take a break and return to it',
      'Research for another hour',
      'Move on and revisit later'
    ]
  },
  {
    id: 'assess-11',
    type: 'behavioral',
    question: 'When a teammate gives critical feedback, how receptive are you?',
    min: 1,
    max: 5,
    minLabel: 'Not at all',
    maxLabel: 'Very receptive',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-12',
    type: 'situational',
    question: 'A new framework becomes required in your project. How do you approach it?',
    options: [
      'Dive into sample projects first',
      'Skim through official docs',
      'Ask for a team knowledge session',
      'List unknowns and research step by step'
    ]
  },
  {
    id: 'assess-13',
    type: 'tradeoff',
    question: 'With limited time, what do you focus on?',
    options: [
      'Learning new concepts',
      'Perfecting existing knowledge'
    ]
  },
  {
    id: 'assess-14',
    type: 'situational',
    question: 'A tool you use frequently is suddenly deprecated. First step?',
    options: [
      'Search for alternatives right away',
      'Contact community for advice',
      'Stick with it until forced to change',
      'Start learning a replacement gradually'
    ]
  },
  {
    id: 'assess-15',
    type: 'behavioral',
    question: 'How often do you set learning goals for yourself?',
    min: 1,
    max: 5,
    minLabel: 'Rarely',
    maxLabel: 'Very frequently',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-16',
    type: 'tradeoff',
    question: 'Do you favor...',
    options: [
      'Short-term wins',
      'Long-term mastery'
    ]
  },
  {
    id: 'assess-17',
    type: 'situational',
    question: 'You’re assigned a task outside your expertise. Response?',
    options: [
      'Ask detailed guidance',
      'Take time to learn independently',
      'Pair with an expert',
      'Break it into manageable chunks'
    ]
  },
  {
    id: 'assess-18',
    type: 'behavioral',
    question: 'How readily do you admit when you don’t know something?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Very readily',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-19',
    type: 'tradeoff',
    question: 'On a fast-paced project, do you prioritize...',
    options: [
      'Trying new solutions',
      'Relying on proven methods'
    ]
  },
  {
    id: 'assess-20',
    type: 'situational',
    question: 'In a group, who usually leads post-mortems after setbacks?',
    options: [
      'I lead them',
      'We rotate responsibility',
      'The manager leads',
      'We seldom do post-mortems'
    ]
  },
  {
    id: 'assess-21',
    type: 'behavioral',
    question: 'How often do you finish what you start despite obstacles?',
    min: 1,
    max: 5,
    minLabel: 'Rarely',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-22',
    type: 'situational',
    question: 'You notice a workflow bottleneck. What’s your approach?',
    options: [
      'Raise it at the next meeting',
      'Try to workaround quietly',
      'Suggest a team retrospective',
      'Do more research before acting'
    ]
  },
  {
    id: 'assess-23',
    type: 'behavioral',
    question: 'Do you track your own progress during learning sprints?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-24',
    type: 'tradeoff',
    question: 'When making decisions, you rely on...',
    options: [
      'Gut instinct',
      'Careful analysis'
    ]
  },
  {
    id: 'assess-25',
    type: 'situational',
    question: 'You’re suddenly the least experienced person in the room. How do you react?',
    options: [
      'Ask questions freely',
      'Observe quietly and learn',
      'Try to contribute anyway',
      'Request more context'
    ]
  },
  {
    id: 'assess-26',
    type: 'behavioral',
    question: 'How often do you challenge yourself to leave your comfort zone?',
    min: 1,
    max: 5,
    minLabel: 'Seldom',
    maxLabel: 'Very often',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-27',
    type: 'tradeoff',
    question: 'Do you value...',
    options: [
      'Fast deployment',
      'Code robustness'
    ]
  },
  {
    id: 'assess-28',
    type: 'situational',
    question: 'Midway, your team’s priorities are reshuffled. First action?',
    options: [
      'Seek clarification from leads',
      'Reprioritize my tasks',
      'Ask for a roadmap update',
      'Share my own updated plan'
    ]
  },
  {
    id: 'assess-29',
    type: 'behavioral',
    question: 'How frequently do you re-evaluate your learning strategies?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Very frequently',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-30',
    type: 'situational',
    question: 'An urgent bug arises just before release. What’s your role?',
    options: [
      'Jump in to fix it',
      'Organize the team response',
      'Support with documentation/testing',
      'Wait for assignment'
    ]
  },
  {
    id: 'assess-31',
    type: 'tradeoff',
    question: 'You prioritize...',
    options: [
      'Speed',
      'Thoroughness'
    ]
  },
  {
    id: 'assess-32',
    type: 'behavioral',
    question: 'How often do you teach others what you’ve learned?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Often',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-33',
    type: 'situational',
    question: 'Your experiment fails publicly in a meeting. Next move?',
    options: [
      'Admit openly and analyze',
      'Stay quiet unless asked',
      'Defend my choices',
      'Defer to the team'
    ]
  },
  {
    id: 'assess-34',
    type: 'behavioral',
    question: 'Do you regularly update your skills on new tech trends?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-35',
    type: 'tradeoff',
    question: 'In high pressure, you choose...',
    options: [
      'Quick fixes',
      'Root cause solutions'
    ]
  },
  {
    id: 'assess-36',
    type: 'situational',
    question: 'You lack clarity on a task. How do you proceed?',
    options: [
      'Clarify requirements immediately',
      'Try a solution and see what happens',
      'Ask peers for their approach',
      'Research best practices first'
    ]
  },
  {
    id: 'assess-37',
    type: 'behavioral',
    question: 'How often do you give constructive feedback to others?',
    min: 1,
    max: 5,
    minLabel: 'Rarely',
    maxLabel: 'Very often',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-38',
    type: 'situational',
    question: 'You receive two conflicting deadlines. Reaction?',
    options: [
      'Negotiate priorities',
      'Work overtime',
      'Decide for myself',
      'Escalate to manager'
    ]
  },
  {
    id: 'assess-39',
    type: 'behavioral',
    question: 'Do you adapt your communication style to your audience?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-40',
    type: 'situational',
    question: 'A leader asks for innovative ideas. What’s your approach?',
    options: [
      'Propose something radical',
      'Suggest small tweaks',
      'Ask for examples first',
      'Listen to others for inspiration'
    ]
  },
  {
    id: 'assess-41',
    type: 'tradeoff',
    question: 'Do you prefer...',
    options: [
      'Open-ended problems',
      'Structured tasks'
    ]
  },
  {
    id: 'assess-42',
    type: 'behavioral',
    question: 'How frequently do you reflect on your mistakes constructively?',
    min: 1,
    max: 5,
    minLabel: 'Rarely',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-43',
    type: 'situational',
    question: 'You need to onboard a new teammate quickly. First step?',
    options: [
      'Give them docs and wish luck',
      'Schedule a walkthrough session',
      'Pair them with a buddy',
      'Ask what they prefer'
    ]
  },
  {
    id: 'assess-44',
    type: 'tradeoff',
    question: 'For rapid learning, you leverage...',
    options: [
      'Hands-on practice',
      'Reading/theory'
    ]
  },
  {
    id: 'assess-45',
    type: 'situational',
    question: 'A sprint goal shifts mid-cycle. Response?',
    options: [
      'Adapt and communicate changes',
      'Stick to original scope',
      'Negotiate new goals',
      'Delay until confirmation'
    ]
  },
  {
    id: 'assess-46',
    type: 'behavioral',
    question: 'How likely are you to pursue feedback proactively?',
    min: 1,
    max: 5,
    minLabel: 'Unlikely',
    maxLabel: 'Very likely',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-47',
    type: 'situational',
    question: 'Critical client feedback arrives late in a project. What do you do?',
    options: [
      'Prioritize rapid fixes',
      'Review with the whole team',
      'Document issues for future',
      'Negotiate scope for this release'
    ]
  },
  {
    id: 'assess-48',
    type: 'tradeoff',
    question: 'With a steep learning curve, do you prefer...',
    options: [
      'Independent exploration',
      'Guided mentorship'
    ]
  },
  {
    id: 'assess-49',
    type: 'behavioral',
    question: 'Do you set aside time for learning, even when busy?',
    min: 1,
    max: 5,
    minLabel: 'Never',
    maxLabel: 'Always',
    emoji: ['🙅', '🤔', '🤷', '🙋', '🤝']
  },
  {
    id: 'assess-50',
    type: 'situational',
    question: 'Asked to deliver a tech talk on short notice, you...',
    options: [
      'Dive in and improvise',
      'Ask for more prep time',
      'Collaborate with others',
      'Decline if unprepared'
    ]
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


import { useAssessment } from '@/contexts/AssessmentContext';
import RadarChart from './RadarChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Download, Share2, Calendar } from 'lucide-react';

const ResultsView = () => {
  const { results, resetAssessment } = useAssessment();
  
  // Format data for radar chart
  const chartData = [
    { name: 'Curiosity', value: results.curiosity },
    { name: 'Resilience', value: results.resilience },
    { name: 'Feedback', value: results.feedbackSensitivity },
    { name: 'Experimentation', value: results.experimentation },
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">Your Agility Scorecard</h2>
        <p className="text-neutral-dark">
          Here's where your learning agility currently stands
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Agility Radar</CardTitle>
              <CardDescription>
                How your learning adaptability measures across four key dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart data={chartData} />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData.map((item) => (
                  <div key={item.name} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span 
                      className={`font-bold ${
                        item.value >= 75 ? 'text-primary' : 
                        item.value >= 50 ? 'text-secondary' : 
                        'text-neutral-dark'
                      }`}
                    >
                      {item.value}%
                    </span>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <p className="text-sm">
                    <strong>Strongest area:</strong> {
                      chartData.reduce((max, item) => 
                        max.value > item.value ? max : item
                      ).name
                    }
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Growth opportunity:</strong> {
                      chartData.reduce((min, item) => 
                        min.value < item.value ? min : item
                      ).name
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Download Report</span>
                  <Download size={16} />
                </Button>
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Share Results</span>
                  <Share2 size={16} />
                </Button>
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Schedule Reassessment</span>
                  <Calendar size={16} />
                </Button>
                <p className="text-xs text-neutral-dark mt-2">
                  Reassessment recommended in 90 days to track your growth.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personalized Playbook</CardTitle>
              <CardDescription>
                Based on your results, here are some strategies to enhance your learning agility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Recommended Micro-Learning</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>5-Day "Embracing Uncertainty" Challenge</li>
                    <li>Feedback Loop: Giving & Receiving Workshop</li>
                    <li>Rapid Prototyping Techniques</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Adaptation Strategies</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Use the 70-20-10 rule for learning new tools</li>
                    <li>Schedule weekly 30-minute exploration sessions</li>
                    <li>Start a learning journal to track insights</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button onClick={resetAssessment}>
                  Start a New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsView;

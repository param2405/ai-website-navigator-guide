
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  title: string;
  description: string;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: 'websiteType',
    title: 'What type of website do you want to build?',
    description: 'This helps us recommend the most suitable AI tools for your project.',
    options: [
      { value: 'blog', label: 'Blog', description: 'Share content and build an audience' },
      { value: 'ecommerce', label: 'E-commerce Store', description: 'Sell products online' },
      { value: 'portfolio', label: 'Portfolio', description: 'Showcase your work and skills' },
      { value: 'landing', label: 'Landing Page', description: 'Convert visitors into customers' },
      { value: 'business', label: 'Business Website', description: 'Establish your company online' },
      { value: 'webapp', label: 'Web Application', description: 'Build interactive functionality' }
    ]
  },
  {
    id: 'primaryGoal',
    title: 'What\'s your primary goal?',
    description: 'Understanding your objective helps us prioritize the right features.',
    options: [
      { value: 'leads', label: 'Generate Leads', description: 'Attract and capture potential customers' },
      { value: 'sales', label: 'Sell Products', description: 'Drive revenue through online sales' },
      { value: 'showcase', label: 'Showcase Work', description: 'Display your portfolio or achievements' },
      { value: 'inform', label: 'Share Information', description: 'Educate or inform your audience' },
      { value: 'community', label: 'Build Community', description: 'Create engagement and discussions' }
    ]
  },
  {
    id: 'budget',
    title: 'What\'s your monthly budget?',
    description: 'We\'ll recommend tools that fit within your budget range.',
    options: [
      { value: 'free', label: 'Free', description: 'Use only free tools and platforms' },
      { value: 'low', label: '₹500 - ₹2,000', description: 'Basic paid tools and hosting' },
      { value: 'medium', label: '₹2,000 - ₹5,000', description: 'Professional tools and features' },
      { value: 'high', label: '₹5,000+', description: 'Premium tools and enterprise features' }
    ]
  },
  {
    id: 'skillLevel',
    title: 'What\'s your technical skill level?',
    description: 'This ensures we recommend tools that match your comfort level.',
    options: [
      { value: 'nocode', label: 'No Code', description: 'I prefer drag-and-drop builders' },
      { value: 'lowcode', label: 'Low Code', description: 'I can handle simple customizations' },
      { value: 'comfortable', label: 'Comfortable with Code', description: 'I can work with HTML, CSS, and basic JavaScript' },
      { value: 'advanced', label: 'Advanced Developer', description: 'I\'m comfortable with frameworks and APIs' }
    ]
  },
  {
    id: 'timeline',
    title: 'How quickly do you need this live?',
    description: 'Your timeline affects which tools and approaches we\'ll recommend.',
    options: [
      { value: 'urgent', label: 'Within Days', description: 'Need something up quickly' },
      { value: 'weeks', label: 'Within Weeks', description: 'Can take time for quality' },
      { value: 'months', label: 'Within Months', description: 'Planning a comprehensive project' },
      { value: 'flexible', label: 'No Rush', description: 'Quality over speed' }
    ]
  }
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
      // Store answers in localStorage for the recommendations page
      localStorage.setItem('userAnswers', JSON.stringify(answers));
      setTimeout(() => {
        navigate('/recommendations');
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = answers[currentQ?.id];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Perfect! Analyzing Your Needs...
            </h2>
            <p className="text-gray-600 mb-6">
              We're creating your personalized AI workflow recommendations.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentQ?.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {currentQ?.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <RadioGroup
              value={answers[currentQ?.id] || ''}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQ?.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="mt-1 border-2 border-gray-300 text-purple-600"
                  />
                  <div className="flex-1 cursor-pointer" onClick={() => handleAnswer(option.value)}>
                    <Label 
                      htmlFor={option.value}
                      className="text-base font-medium text-gray-800 cursor-pointer block"
                    >
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl border-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;

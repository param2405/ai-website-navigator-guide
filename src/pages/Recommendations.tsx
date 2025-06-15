
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
  pricing: string;
  logo?: string;
}

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  tools: Tool[];
  estimated_time: string;
}

interface RecommendationData {
  title: string;
  description: string;
  workflow: WorkflowStep[];
  total_estimated_time: string;
  difficulty_level: string;
}

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const answers = localStorage.getItem('userAnswers');
    if (!answers) {
      navigate('/questionnaire');
      return;
    }

    // Generate recommendations based on user answers
    const userAnswers = JSON.parse(answers);
    const generatedRecommendations = generateRecommendations(userAnswers);
    setRecommendations(generatedRecommendations);
  }, [navigate]);

  const generateRecommendations = (answers: Record<string, string>): RecommendationData => {
    const { websiteType, primaryGoal, budget, skillLevel, timeline } = answers;

    // AI tools database
    const tools = {
      nocode_builders: [
        { name: "Bolt.new", description: "AI-powered website builder with instant deployment", category: "Website Builder", url: "https://bolt.new", pricing: "Free tier available" },
        { name: "Framer", description: "Advanced no-code website builder with AI features", category: "Website Builder", url: "https://framer.com", pricing: "Free - $20/month" },
        { name: "Webflow", description: "Professional no-code web design platform", category: "Website Builder", url: "https://webflow.com", pricing: "$12 - $36/month" }
      ],
      ai_content: [
        { name: "Claude", description: "AI assistant for content creation and copywriting", category: "Content Generation", url: "https://claude.ai", pricing: "Free tier available" },
        { name: "ChatGPT", description: "Versatile AI for content, copy, and code generation", category: "Content Generation", url: "https://chat.openai.com", pricing: "Free - $20/month" },
        { name: "Copy.ai", description: "AI copywriting tool for marketing content", category: "Content Generation", url: "https://copy.ai", pricing: "$36 - $186/month" }
      ],
      ai_images: [
        { name: "Midjourney", description: "Premium AI image generator for unique visuals", category: "Image Generation", url: "https://midjourney.com", pricing: "$10 - $120/month" },
        { name: "DALL-E 2", description: "OpenAI's image generator for custom graphics", category: "Image Generation", url: "https://openai.com/dall-e-2", pricing: "$0.02 per image" },
        { name: "Unsplash", description: "Free high-quality stock photos", category: "Stock Images", url: "https://unsplash.com", pricing: "Free" }
      ],
      hosting: [
        { name: "Vercel", description: "Frontend cloud platform with instant deployments", category: "Hosting", url: "https://vercel.com", pricing: "Free tier available" },
        { name: "Netlify", description: "Modern web development platform", category: "Hosting", url: "https://netlify.com", pricing: "Free - $19/month" },
        { name: "GitHub Pages", description: "Free static site hosting", category: "Hosting", url: "https://pages.github.com", pricing: "Free" }
      ],
      code_tools: [
        { name: "Lovable.dev", description: "AI-powered web app development platform", category: "Code Generation", url: "https://lovable.dev", pricing: "Free tier available" },
        { name: "Cursor", description: "AI-powered code editor", category: "Code Editor", url: "https://cursor.sh", pricing: "$20/month" },
        { name: "GitHub Copilot", description: "AI coding assistant", category: "Code Assistant", url: "https://github.com/copilot", pricing: "$10/month" }
      ],
      ecommerce: [
        { name: "Shopify", description: "Complete e-commerce platform", category: "E-commerce", url: "https://shopify.com", pricing: "$29 - $299/month" },
        { name: "WooCommerce", description: "WordPress e-commerce plugin", category: "E-commerce", url: "https://woocommerce.com", pricing: "Free + hosting costs" }
      ]
    };

    // Rule-based recommendation logic
    let workflow: WorkflowStep[] = [];
    let title = "";
    let description = "";

    if (websiteType === 'blog') {
      title = "AI-Powered Blog Creation Workflow";
      description = "Build a content-rich blog with AI assistance for writing and design.";
      workflow = [
        {
          step: 1,
          title: "Choose Your Platform",
          description: "Select a blog-friendly platform that supports AI integration",
          tools: skillLevel === 'nocode' ? tools.nocode_builders.slice(0, 2) : [...tools.nocode_builders.slice(0, 1), ...tools.code_tools.slice(0, 1)],
          estimated_time: "30 minutes"
        },
        {
          step: 2,
          title: "Generate Content",
          description: "Use AI to create engaging blog posts and copy",
          tools: tools.ai_content,
          estimated_time: "2-4 hours"
        },
        {
          step: 3,
          title: "Create Visuals",
          description: "Generate or source images for your blog posts",
          tools: budget === 'free' ? [tools.ai_images[2]] : tools.ai_images,
          estimated_time: "1-2 hours"
        },
        {
          step: 4,
          title: "Deploy & Host",
          description: "Get your blog live on the internet",
          tools: budget === 'free' ? [tools.hosting[2]] : tools.hosting,
          estimated_time: "15 minutes"
        }
      ];
    } else if (websiteType === 'ecommerce') {
      title = "AI-Enhanced E-commerce Store Setup";
      description = "Launch your online store with AI-generated content and optimized design.";
      workflow = [
        {
          step: 1,
          title: "Set Up E-commerce Platform",
          description: "Choose and configure your online store foundation",
          tools: budget === 'free' ? [tools.ecommerce[1]] : tools.ecommerce,
          estimated_time: "1-2 hours"
        },
        {
          step: 2,
          title: "Generate Product Content",
          description: "Create compelling product descriptions and marketing copy",
          tools: tools.ai_content,
          estimated_time: "3-5 hours"
        },
        {
          step: 3,
          title: "Create Product Images",
          description: "Generate or enhance product photography",
          tools: budget === 'free' ? [tools.ai_images[2]] : tools.ai_images,
          estimated_time: "2-4 hours"
        },
        {
          step: 4,
          title: "Launch & Optimize",
          description: "Deploy your store and set up analytics",
          tools: [tools.hosting[0]],
          estimated_time: "30 minutes"
        }
      ];
    } else if (websiteType === 'portfolio') {
      title = "Professional Portfolio with AI Design";
      description = "Showcase your work with an AI-designed portfolio that stands out.";
      workflow = [
        {
          step: 1,
          title: "Design Your Portfolio",
          description: "Create a stunning portfolio layout with AI assistance",
          tools: skillLevel === 'nocode' ? tools.nocode_builders : [...tools.nocode_builders.slice(0, 1), ...tools.code_tools.slice(0, 1)],
          estimated_time: "2-3 hours"
        },
        {
          step: 2,
          title: "Write Compelling Copy",
          description: "Generate professional descriptions and about sections",
          tools: tools.ai_content.slice(0, 2),
          estimated_time: "1-2 hours"
        },
        {
          step: 3,
          title: "Enhance Visuals",
          description: "Optimize and enhance your portfolio images",
          tools: budget === 'free' ? [tools.ai_images[2]] : tools.ai_images,
          estimated_time: "1-2 hours"
        },
        {
          step: 4,
          title: "Deploy Portfolio",
          description: "Make your portfolio live and accessible",
          tools: tools.hosting,
          estimated_time: "15 minutes"
        }
      ];
    } else {
      // Default workflow for other types
      title = "AI-Powered Website Building Workflow";
      description = "Build your website efficiently with AI tools tailored to your needs.";
      workflow = [
        {
          step: 1,
          title: "Build Your Foundation",
          description: "Set up your website structure and design",
          tools: skillLevel === 'nocode' ? tools.nocode_builders : [...tools.nocode_builders.slice(0, 1), ...tools.code_tools.slice(0, 1)],
          estimated_time: "2-4 hours"
        },
        {
          step: 2,
          title: "Create Content",
          description: "Generate engaging copy and content with AI",
          tools: tools.ai_content,
          estimated_time: "2-3 hours"
        },
        {
          step: 3,
          title: "Add Visuals",
          description: "Create or source images for your website",
          tools: budget === 'free' ? [tools.ai_images[2]] : tools.ai_images,
          estimated_time: "1-2 hours"
        },
        {
          step: 4,
          title: "Launch Website",
          description: "Deploy your website to the internet",
          tools: budget === 'free' ? [tools.hosting[2]] : tools.hosting,
          estimated_time: "30 minutes"
        }
      ];
    }

    const totalTime = timeline === 'urgent' ? "1-2 days" : timeline === 'weeks' ? "1-2 weeks" : "2-4 weeks";
    const difficulty = skillLevel === 'nocode' ? "Beginner" : skillLevel === 'lowcode' ? "Easy" : "Intermediate";

    return {
      title,
      description,
      workflow,
      total_estimated_time: totalTime,
      difficulty_level: difficulty
    };
  };

  const toggleStepComplete = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(step => step !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  const completionPercentage = (completedSteps.length / recommendations.workflow.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
            <Badge variant="secondary" className="text-sm font-medium">
              Personalized Recommendations
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {recommendations.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {recommendations.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="w-4 h-4 mr-1" />
              {recommendations.total_estimated_time}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Difficulty: {recommendations.difficulty_level}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Progress: {Math.round(completionPercentage)}%
            </Badge>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-8">
          {recommendations.workflow.map((step, index) => {
            const isCompleted = completedSteps.includes(step.step);
            
            return (
              <Card key={step.step} className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.step}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                          {step.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          {step.description}
                        </CardDescription>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Estimated: {step.estimated_time}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleStepComplete(step.step)}
                      className={isCompleted ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {isCompleted ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {step.tools.map((tool, toolIndex) => (
                      <Card key={toolIndex} className="bg-gray-50/50 border border-gray-200 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {tool.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{tool.pricing}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() => window.open(tool.url, '_blank')}
                            >
                              Visit <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            variant="outline"
            onClick={() => navigate('/questionnaire')}
            className="px-6 py-3 rounded-xl border-2"
          >
            Retake Assessment
          </Button>
          
          <Button
            onClick={() => navigate('/tools')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Browse All Tools
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

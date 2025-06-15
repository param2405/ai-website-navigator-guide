import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Search, Zap, Globe, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: Code,
      title: "AI Code Generator",
      description: "Generate clean, optimized code for your website components automatically.",
      features: ["React Components", "CSS Styling", "JavaScript Functions"]
    },
    {
      icon: Palette,
      title: "Smart Design Assistant",
      description: "Get AI-powered design suggestions that match your brand and industry.",
      features: ["Color Palettes", "Typography", "Layout Suggestions"]
    },
    {
      icon: Search,
      title: "SEO Optimizer",
      description: "Boost your search rankings with intelligent SEO recommendations.",
      features: ["Keyword Research", "Meta Tags", "Content Optimization"]
    },
    {
      icon: Zap,
      title: "Performance Booster",
      description: "Automatically optimize your website for lightning-fast loading speeds.",
      features: ["Image Compression", "Code Minification", "Caching Strategies"]
    },
    {
      icon: Globe,
      title: "Content Creator",
      description: "Generate engaging content tailored to your audience and goals.",
      features: ["Blog Posts", "Product Descriptions", "Marketing Copy"]
    },
    {
      icon: Shield,
      title: "Security Scanner",
      description: "Protect your website with automated security checks and fixes.",
      features: ["Vulnerability Detection", "SSL Configuration", "Backup Solutions"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI-Powered Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to streamline your website development process. 
            Our comprehensive suite of tools helps you build faster, smarter, and more effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <tool.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-800">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 text-center">
                  {tool.description}
                </CardDescription>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  Try Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience the Future of Web Development?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get started with our AI tools and transform the way you build websites.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate('/questionnaire')}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tools;

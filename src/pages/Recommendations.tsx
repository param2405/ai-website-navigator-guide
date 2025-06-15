import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Recommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      category: "E-commerce",
      title: "Shopify + Custom Design",
      description: "Perfect for selling products online with professional design and robust features.",
      rating: 4.8,
      timeToLaunch: "2-3 weeks",
      complexity: "Medium",
      price: "$2,000 - $5,000",
      features: ["Payment Processing", "Inventory Management", "Mobile Responsive", "SEO Optimized"],
      pros: ["Easy to manage", "Scalable", "Great support"],
      bestFor: "Small to medium businesses wanting to sell online"
    },
    {
      category: "Portfolio",
      title: "React + Modern Design",
      description: "Showcase your work with a fast, modern, and visually stunning portfolio website.",
      rating: 4.9,
      timeToLaunch: "1-2 weeks",
      complexity: "Low",
      price: "$800 - $2,000",
      features: ["Portfolio Gallery", "Contact Forms", "Blog Integration", "Fast Loading"],
      pros: ["Highly customizable", "Great performance", "Professional look"],
      bestFor: "Designers, developers, and creative professionals"
    },
    {
      category: "Business",
      title: "WordPress + Premium Theme",
      description: "Professional business website with content management and marketing tools.",
      rating: 4.6,
      timeToLaunch: "2-4 weeks",
      complexity: "Medium",
      price: "$1,500 - $4,000",
      features: ["CMS", "Contact Forms", "Social Integration", "Analytics"],
      pros: ["Content-friendly", "Plugin ecosystem", "SEO ready"],
      bestFor: "Service businesses and content-heavy websites"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Personalized Recommendations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your needs and goals, we've curated the best website solutions for you. 
            Each recommendation is tailored to help you achieve success online.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {recommendations.map((rec, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">{rec.category}</Badge>
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{rec.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-lg">{rec.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-800">{rec.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-800">Timeline</p>
                      <p className="text-sm text-gray-600">{rec.timeToLaunch}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-800">Complexity</p>
                      <p className="text-sm text-gray-600">{rec.complexity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-800">Investment</p>
                      <p className="text-sm text-gray-600">{rec.price}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                    <ul className="space-y-1">
                      {rec.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Why This Works</h4>
                    <ul className="space-y-1">
                      {rec.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Best for:</span> {rec.bestFor}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => navigate('/auth?mode=signup')}
                  >
                    Get Started
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Recommendation?</h2>
            <p className="text-lg mb-6 opacity-90">
              Take our detailed questionnaire to get personalized suggestions based on your specific needs.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate('/questionnaire')}
            >
              Take Questionnaire
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Recommendations;

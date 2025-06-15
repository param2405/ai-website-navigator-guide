
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Target, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-purple-600 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Website Builder
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into stunning websites with the power of AI. 
            Get personalized recommendations and build your perfect online presence in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
              onClick={() => navigate('/questionnaire')}
            >
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3"
              onClick={() => navigate('/tools')}
            >
              Explore Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our AI Builder?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our intelligent platform combines cutting-edge AI with user-friendly design to create websites that truly represent your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Create professional websites in minutes, not hours. Our AI accelerates the entire design process.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold">Personalized</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get tailored recommendations based on your specific needs, goals, and industry requirements.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold">User-Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                No coding required. Our intuitive interface makes website building accessible to everyone.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Website?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users who've transformed their online presence with our AI-powered platform.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => navigate('/questionnaire')}
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

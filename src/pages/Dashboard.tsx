
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Calendar, Target, Clock, ArrowRight, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UserQuestionnaire {
  id: string;
  website_type: string;
  primary_goal: string;
  budget: string;
  skill_level: string;
  timeline: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState<UserQuestionnaire[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchUserQuestionnaires();
    }
  }, [user, loading, navigate]);

  const fetchUserQuestionnaires = async () => {
    try {
      const { data, error } = await supabase
        .from('user_questionnaires')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestionnaires(data || []);
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </h1>
          <p className="text-gray-600">
            Track your website building progress and get personalized recommendations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questionnaires</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{questionnaires.length}</div>
              <p className="text-xs text-muted-foreground">
                Total assessments completed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Type</CardTitle>
              <User className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free</div>
              <p className="text-xs text-muted-foreground">
                Current plan
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(user?.created_at || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <p className="text-xs text-muted-foreground">
                Join date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Questionnaires */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Your Assessments
                </CardTitle>
                <CardDescription>
                  View and manage your website building assessments
                </CardDescription>
              </div>
              <Button 
                onClick={() => navigate('/questionnaire')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {questionnaires.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No assessments yet</h3>
                <p className="text-gray-500 mb-4">
                  Start by taking our questionnaire to get personalized AI tool recommendations.
                </p>
                <Button 
                  onClick={() => navigate('/questionnaire')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Take Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {questionnaires.map((questionnaire) => (
                  <div key={questionnaire.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="capitalize">
                          {questionnaire.website_type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {questionnaire.budget}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Goal: {questionnaire.primary_goal} • Skill: {questionnaire.skill_level}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(questionnaire.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/recommendations')}
                    >
                      View Results
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Explore AI Tools</h3>
              <p className="text-purple-100 mb-4">
                Browse our curated collection of AI tools for website building.
              </p>
              <Button 
                variant="secondary"
                onClick={() => navigate('/tools')}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Browse Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
              <p className="text-green-100 mb-4">
                View your personalized tool recommendations and workflows.
              </p>
              <Button 
                variant="secondary"
                onClick={() => navigate('/recommendations')}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                View Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;

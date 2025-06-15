
import { Sparkles, Github, Twitter, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
              <h3 className="text-lg font-bold">AI Website Builder</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Build your perfect website with AI-powered tools and personalized recommendations.
            </p>
            <div className="flex space-x-3">
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/questionnaire')}>Questionnaire</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/tools')}>AI Tools</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/recommendations')}>Recommendations</span></li>
              {user && (
                <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span></li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">About</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Blog</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Careers</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Contact</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">Help Center</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
              {user && (
                <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>My Dashboard</span></li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 AI Website Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

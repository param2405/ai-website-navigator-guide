
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Search, Filter } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
  pricing: string;
  features: string[];
  rating: number;
}

const allTools: Tool[] = [
  {
    name: "Bolt.new",
    description: "AI-powered website builder that creates and deploys websites instantly using natural language prompts.",
    category: "Website Builders",
    url: "https://bolt.new",
    pricing: "Free tier available",
    features: ["Natural language prompts", "Instant deployment", "Full-stack support", "Real-time preview"],
    rating: 4.8
  },
  {
    name: "Lovable.dev",
    description: "AI-powered web app development platform that generates React applications with modern tech stack.",
    category: "Code Generation",
    url: "https://lovable.dev",
    pricing: "Free - $50/month",
    features: ["React generation", "TypeScript support", "Modern UI components", "Real-time collaboration"],
    rating: 4.9
  },
  {
    name: "Framer",
    description: "Advanced no-code website builder with AI-powered design assistance and professional templates.",
    category: "Website Builders",
    url: "https://framer.com",
    pricing: "Free - $20/month",
    features: ["AI design assistant", "Advanced animations", "CMS integration", "Custom code support"],
    rating: 4.7
  },
  {
    name: "Claude",
    description: "Advanced AI assistant perfect for content creation, copywriting, and technical documentation.",
    category: "Content Generation",
    url: "https://claude.ai",
    pricing: "Free - $20/month",
    features: ["Long-form content", "Code assistance", "Document analysis", "Creative writing"],
    rating: 4.6
  },
  {
    name: "ChatGPT",
    description: "Versatile AI assistant for content creation, code generation, and problem-solving.",
    category: "Content Generation",
    url: "https://chat.openai.com",
    pricing: "Free - $20/month",
    features: ["Conversational AI", "Code generation", "Creative writing", "Problem solving"],
    rating: 4.5
  },
  {
    name: "Midjourney",
    description: "Premium AI image generator creating stunning, artistic visuals from text descriptions.",
    category: "Image Generation",
    url: "https://midjourney.com",
    pricing: "$10 - $120/month",
    features: ["Artistic styles", "High resolution", "Style consistency", "Community gallery"],
    rating: 4.8
  },
  {
    name: "DALL-E 2",
    description: "OpenAI's image generator for creating custom graphics and illustrations from text.",
    category: "Image Generation",
    url: "https://openai.com/dall-e-2",
    pricing: "$0.02 per image",
    features: ["Realistic images", "Style variations", "Image editing", "API access"],
    rating: 4.4
  },
  {
    name: "Vercel",
    description: "Frontend cloud platform with instant deployments and excellent performance optimization.",
    category: "Hosting",
    url: "https://vercel.com",
    pricing: "Free - $20/month",
    features: ["Instant deployments", "Global CDN", "Analytics", "Serverless functions"],
    rating: 4.9
  },
  {
    name: "Netlify",
    description: "Modern web development platform with continuous deployment and powerful build tools.",
    category: "Hosting",
    url: "https://netlify.com",
    pricing: "Free - $19/month",
    features: ["Git integration", "Form handling", "Edge functions", "Identity management"],
    rating: 4.7
  },
  {
    name: "Shopify",
    description: "Complete e-commerce platform with AI-powered features for online store creation.",
    category: "E-commerce",
    url: "https://shopify.com",
    pricing: "$29 - $299/month",
    features: ["Store builder", "Payment processing", "Inventory management", "Marketing tools"],
    rating: 4.6
  },
  {
    name: "GitHub Copilot",
    description: "AI coding assistant that helps write code faster with intelligent suggestions.",
    category: "Code Assistants",
    url: "https://github.com/copilot",
    pricing: "$10/month",
    features: ["Code completion", "Multiple languages", "Context awareness", "IDE integration"],
    rating: 4.5
  },
  {
    name: "Cursor",
    description: "AI-powered code editor with advanced AI features for faster development.",
    category: "Code Assistants",
    url: "https://cursor.sh",
    pricing: "$20/month",
    features: ["AI code editing", "Natural language commands", "Codebase understanding", "Pair programming"],
    rating: 4.7
  }
];

const categories = ["All", "Website Builders", "Content Generation", "Image Generation", "Hosting", "E-commerce", "Code Generation", "Code Assistants"];

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const filteredTools = allTools
    .filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Tools Directory
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the best AI tools for building your website, organized by category and use case.
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50"
                />
              </div>
              
              <div className="flex gap-3 items-center">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-white/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 bg-white/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {tool.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-gray-600">{tool.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {tool.pricing}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {tool.description}
                </CardDescription>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 3).map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {tool.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tool.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open(tool.url, '_blank')}
                >
                  Visit {tool.name}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tools;

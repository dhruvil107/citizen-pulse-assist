import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Smartphone,
  Globe,
  Bot
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Easy Reporting",
      description: "Submit complaints with photo, location, and description in seconds"
    },
    {
      icon: Bot,
      title: "AI-Powered",
      description: "Automatic categorization and department routing using AI"
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Track your complaint status from submission to resolution"
    },
    {
      icon: Globe,
      title: "Bilingual Support",
      description: "Available in English and Gujarati for better accessibility"
    }
  ];

  const stats = [
    { label: "Complaints Resolved", value: "2,847", icon: CheckCircle },
    { label: "Active Users", value: "15,623", icon: Users },
    { label: "Avg Response Time", value: "2.3 days", icon: Clock },
    { label: "Success Rate", value: "94%", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Smart Civic Engagement Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Voice,{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Your City
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Report civic issues effortlessly with AI-powered categorization, real-time tracking, 
              and bilingual support. Making cities better, one complaint at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/complaint">
                <Button variant="hero" size="lg" className="min-w-48">
                  Report an Issue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="min-w-48">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 hidden lg:block">
          <Card className="shadow-card animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Pothole Fixed!</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute top-1/3 right-10 transform -translate-y-1/2 hidden lg:block">
          <Card className="shadow-card animate-pulse delay-1000">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Issue Resolved</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Better Cities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets civic engagement to create meaningful change in your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-primary transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of citizens who are already making their cities better. 
            Your report could be the solution someone needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="lg" className="min-w-48">
                Get Started Today
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="min-w-48 border-white text-white hover:bg-white hover:text-primary">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-hero rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Citymitra</span>
              </div>
              <p className="text-background/70 text-sm">
                Making cities smarter through citizen engagement and AI-powered solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/services" className="block text-background/70 hover:text-background">Services</Link>
                <Link to="/about" className="block text-background/70 hover:text-background">About Us</Link>
                <Link to="/contact" className="block text-background/70 hover:text-background">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-background/70 hover:text-background">Help Center</a>
                <a href="#" className="block text-background/70 hover:text-background">Privacy Policy</a>
                <a href="#" className="block text-background/70 hover:text-background">Terms of Service</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-sm text-background/70">
                Follow us for updates and civic engagement tips.
              </p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
            © 2024 Citymitra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
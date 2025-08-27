import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import teamPhoto from "@/assets/team-photo.jpg";
import { 
  MapPin, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Bot,
  Heart,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";

const About = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Categorization",
      description: "Advanced machine learning algorithms automatically categorize and route complaints to the appropriate departments."
    },
    {
      icon: Zap,
      title: "Real-time Tracking", 
      description: "Monitor your complaint status in real-time from submission to resolution with instant notifications."
    },
    {
      icon: Globe,
      title: "Bilingual Support",
      description: "Available in English and Gujarati to ensure accessibility for all citizens across diverse communities."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your personal information and complaint details are protected with enterprise-grade security."
    }
  ];

  const stats = [
    { icon: Users, label: "Active Citizens", value: "15,000+" },
    { icon: CheckCircle, label: "Issues Resolved", value: "2,847" },
    { icon: TrendingUp, label: "Response Rate", value: "94%" },
    { icon: Award, label: "Satisfaction Score", value: "4.8/5" }
  ];

  const team = [
    {
      name: "Dhruvil Patel",
      role: "Founder & Lead Developer",
      description: "Passionate about civic technology and creating solutions that bridge the gap between citizens and government services."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            About Citymitra
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Empowering Citizens,{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Building Better Cities
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Citymitra is a revolutionary civic engagement platform that uses AI technology 
            to streamline the process of reporting and resolving municipal issues, creating 
            stronger connections between citizens and their local government.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="h-6 w-6 text-primary mr-3" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize civic engagement by providing every citizen with a powerful, 
                  easy-to-use platform that ensures their voice is heard and their community 
                  issues are addressed promptly. We believe that technology can bridge the 
                  gap between citizens and government, creating more responsive and accountable 
                  public services.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MapPin className="h-6 w-6 text-secondary mr-3" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create smart, connected cities where every citizen feels empowered to 
                  contribute to their community's improvement. We envision a future where 
                  AI-powered civic platforms make cities more livable, sustainable, and 
                  responsive to the needs of all residents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We're Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining cutting-edge AI technology with user-centric design to create 
              the most effective civic engagement platform available today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-primary transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Impact by Numbers
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real communities using Citymitra
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card">
                <CardContent className="p-8">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story/Journey */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  Citymitra was born from a simple observation: citizens want to help make their 
                  cities better, but often lack an effective way to communicate issues to the 
                  right people. Traditional complaint systems are slow, bureaucratic, and often 
                  lead to frustrated citizens and unresolved problems.
                </p>
                <p className="mb-6">
                  By leveraging artificial intelligence and modern web technologies, we've created 
                  a platform that not only makes it easy for citizens to report issues but also 
                  ensures those reports reach the right department quickly and efficiently. Our 
                  AI-powered categorization system has reduced response times by over 60% compared 
                  to traditional methods.
                </p>
                <p>
                  Today, Citymitra serves thousands of citizens across multiple cities, helping 
                  resolve everything from potholes to streetlight outages. But this is just the 
                  beginning. We're continuously innovating to make civic engagement even more 
                  effective and accessible for everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-muted-foreground">
              Dedicated individuals working to improve civic engagement
            </p>
          </div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card max-w-md">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of the change. Help us build better communities through technology 
            and civic engagement. Your voice matters, and we're here to make sure it's heard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="lg" className="min-w-48">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="min-w-48 border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Zap, 
  Wrench, 
  Droplets, 
  Car,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

// Import project images
import smartRoadsImg from "@/assets/project-smart-roads.jpg";
import wasteManagementImg from "@/assets/project-waste-management.jpg";
import trafficAIImg from "@/assets/project-traffic-ai.jpg";
import waterMonitoringImg from "@/assets/project-water-monitoring.jpg";

const Services = () => {
  const { t } = useLanguage();

  const upcomingProjects = [
    {
      id: 1,
      title: t('smartRoads'),
      description: t('smartRoadsDesc'),
      category: "Infrastructure",
      icon: Wrench,
      image: smartRoadsImg,
      launchDate: "Q2 2024",
      status: "Development"
    },
    {
      id: 2,
      title: t('smartWaste'),
      description: t('smartWasteDesc'),
      category: "Environment",
      icon: AlertTriangle,
      image: wasteManagementImg,
      launchDate: "Q2 2024",
      status: "Planning"
    },
    {
      id: 3,
      title: t('trafficAI'),
      description: t('trafficAIDesc'),
      category: "Transportation",
      icon: Car,
      image: trafficAIImg,
      launchDate: "Q3 2024", 
      status: "Research"
    },
    {
      id: 4,
      title: t('waterMonitoring'),
      description: t('waterMonitoringDesc'),
      category: "Utilities",
      icon: Droplets,
      image: waterMonitoringImg,
      launchDate: "Q3 2024",
      status: "Planning"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Development":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-orange-100 text-orange-800";
      case "Research":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Development":
        return <Zap className="h-4 w-4" />;
      case "Planning":
        return <Clock className="h-4 w-4" />;
      case "Research":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            {t('comingSoon')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('upcomingProjects')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('upcomingSubtitle')}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-muted-foreground">Projects in Pipeline</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success mb-1">Q2 2024</div>
              <div className="text-sm text-muted-foreground">First Launch</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning mb-1">₹5.2Cr</div>
              <div className="text-sm text-muted-foreground">Investment Planned</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Citizens to Benefit</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {upcomingProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <Card key={project.id} className="shadow-card hover:shadow-primary transition-all duration-300 overflow-hidden">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(project.status)} bg-white/90 backdrop-blur-sm`}
                    >
                      {getStatusIcon(project.status)}
                      <span className="ml-1">{project.status}</span>
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-primary rounded-lg">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {project.category}
                          </Badge>
                          <Badge variant="secondary" className="text-primary">
                            Launch: {project.launchDate}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-primary mb-2">
                      {t('comingSoon')}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This exciting project is currently under development. Stay tuned for updates!
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CodeBlazers Attribution */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-primary rounded-lg text-white font-semibold">
            <Zap className="w-5 h-5 mr-2" />
            {t('developedBy')}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Current Services Available
          </h3>
          <p className="text-muted-foreground mb-6">
            While we prepare these exciting new features, check out our current complaint tracking system to see ongoing city improvements.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/complaint-progress" 
              className="inline-flex items-center px-6 py-3 bg-gradient-hero text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              View Current Progress
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/complaint" 
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold"
            >
              Report New Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
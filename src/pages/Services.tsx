import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import { 
  Wrench, 
  Lightbulb, 
  Droplets, 
  Trash2, 
  Car, 
  TreePine,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Road Repair - MG Road",
      category: "Roads & Infrastructure",
      description: "Pothole repair and road resurfacing on MG Road from City Center to Railway Station",
      department: "Public Works Department",
      progress: 75,
      status: "In Progress",
      priority: "High",
      estimatedCompletion: "2024-01-15",
      icon: Wrench,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Street Light Installation - Phase 2",
      category: "Street Lighting",
      description: "Installing LED street lights in residential areas of Sector 7 and 8",
      department: "Electrical Department",
      progress: 45,
      status: "In Progress", 
      priority: "Medium",
      estimatedCompletion: "2024-01-20",
      icon: Lightbulb,
      color: "bg-yellow-500"
    },
    {
      id: 3,
      title: "Drainage System Upgrade",
      category: "Water & Drainage",
      description: "Upgrading storm drainage system in flood-prone areas of the city",
      department: "Water Management",
      progress: 30,
      status: "In Progress",
      priority: "High",
      estimatedCompletion: "2024-02-10",
      icon: Droplets,
      color: "bg-cyan-500"
    },
    {
      id: 4,
      title: "Waste Collection Optimization",
      category: "Waste Management", 
      description: "Implementing smart waste collection routes and schedules citywide",
      department: "Sanitation Department",
      progress: 60,
      status: "In Progress",
      priority: "Medium",
      estimatedCompletion: "2024-01-25",
      icon: Trash2,
      color: "bg-green-500"
    },
    {
      id: 5,
      title: "Traffic Signal Modernization",
      category: "Traffic Issues",
      description: "Upgrading traffic signals with smart timing and pedestrian crossing systems",
      department: "Traffic Police",
      progress: 85,
      status: "Near Completion",
      priority: "High", 
      estimatedCompletion: "2024-01-12",
      icon: Car,
      color: "bg-red-500"
    },
    {
      id: 6,
      title: "City Park Renovation",
      category: "Parks & Recreation",
      description: "Complete renovation of Central City Park including playground and walking tracks",
      department: "Parks Department",
      progress: 20,
      status: "Planning",
      priority: "Low",
      estimatedCompletion: "2024-03-15",
      icon: TreePine,
      color: "bg-emerald-500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Near Completion":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Near Completion":
        return <CheckCircle className="h-4 w-4" />;
      case "Planning":
        return <AlertTriangle className="h-4 w-4" />;
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services in Progress
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track ongoing civic improvement projects across the city. See real-time progress 
            and estimated completion dates for various infrastructure initiatives.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">6</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success mb-1">12</div>
              <div className="text-sm text-muted-foreground">Completed This Month</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning mb-1">₹2.4Cr</div>
              <div className="text-sm text-muted-foreground">Budget Allocated</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary mb-1">18</div>
              <div className="text-sm text-muted-foreground">Days Avg Completion</div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="shadow-card hover:shadow-primary transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${service.color} rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{service.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mb-2">
                          {service.department}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge 
                            variant="secondary" 
                            className={getStatusColor(service.status)}
                          >
                            {getStatusIcon(service.status)}
                            <span className="ml-1">{service.status}</span>
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={getPriorityColor(service.priority)}
                          >
                            {service.priority} Priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{service.progress}%</span>
                      </div>
                      <Progress value={service.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Est. Completion:</span>
                      <span className="font-medium">
                        {new Date(service.estimatedCompletion).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs">
                        Category: {service.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-muted/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Want to report a new issue?
          </h3>
          <p className="text-muted-foreground mb-6">
            Help us identify problems in your area and we'll add them to our improvement pipeline.
          </p>
          <div className="flex justify-center">
            <a 
              href="/complaint" 
              className="inline-flex items-center px-6 py-3 bg-gradient-hero text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Submit New Complaint
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
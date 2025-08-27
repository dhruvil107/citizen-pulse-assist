import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  Send,
  MessageSquare,
  HeadphonesIcon,
  Globe
} from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form submission logic
    console.log("Contact form submitted");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      value: "support@citymitra.com",
      action: "mailto:support@citymitra.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      value: "+91 98765 43210",
      action: "tel:+919876543210"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      value: "Available 9 AM - 6 PM",
      action: "#"
    },
    {
      icon: MapPin,
      title: "Office Address",
      description: "Visit our office",
      value: "123 Tech Park, Ahmedabad, Gujarat 380015",
      action: "#"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to resolve a complaint?",
      answer: "Resolution times vary by issue type and priority. Most issues are acknowledged within 24 hours and resolved within 5-7 business days."
    },
    {
      question: "Can I track my complaint status?",
      answer: "Yes! Once you submit a complaint, you'll receive a unique ID to track progress in real-time through your dashboard."
    },
    {
      question: "Is Citymitra available in regional languages?",
      answer: "Currently, we support English and Gujarati. We're working to add more regional languages based on community needs."
    },
    {
      question: "How does the AI categorization work?",
      answer: "Our AI analyzes your complaint description and photos to automatically categorize issues and route them to the appropriate department."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions, suggestions, or need help? We're here to assist you. 
            Reach out to us through any of the channels below or fill out our contact form.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Send className="h-6 w-6 text-primary mr-3" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Dhruvil"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Patel"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="dhruvil@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="newsletter"
                      type="checkbox"
                      className="rounded border-border"
                    />
                    <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
                      Subscribe to our newsletter for updates and civic engagement tips
                    </Label>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="h-5 w-5 text-primary mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <method.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{method.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{method.description}</p>
                      <a 
                        href={method.action} 
                        className="text-sm text-primary hover:underline"
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 inline mr-1" />
                    24/7 online complaint submission available
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-card border-warning">
              <CardHeader>
                <CardTitle className="text-warning">Emergency Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  For urgent safety issues that require immediate attention:
                </p>
                <div className="space-y-2">
                  <a href="tel:100" className="flex items-center text-warning font-semibold">
                    <Phone className="h-4 w-4 mr-2" />
                    Police: 100
                  </a>
                  <a href="tel:101" className="flex items-center text-warning font-semibold">
                    <Phone className="h-4 w-4 mr-2" />
                    Fire: 101
                  </a>
                  <a href="tel:108" className="flex items-center text-warning font-semibold">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency: 108
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-center">
                Quick answers to common questions about Citymitra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-foreground">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
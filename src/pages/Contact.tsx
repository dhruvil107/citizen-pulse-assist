import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import SimplePopup from "@/components/ui/SimplePopup";
import { toast } from "@/hooks/use-toast";
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
  const [popupOpen, setPopupOpen] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPopupOpen(true);
    // Optionally reset the form here
    // (e.target as HTMLFormElement).reset();
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
      <SimplePopup open={popupOpen} onClose={() => setPopupOpen(false)}>
        <div className="text-center">
          <div className="font-bold text-lg mb-2">Message Sent!</div>
          <div className="text-muted-foreground text-sm">Your message was sent successfully.</div>
        </div>
      </SimplePopup>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary">Contact Us</h1>
          <p className="text-base text-muted-foreground">We're here to help. Fill out the form or use the info below to reach us.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Card className="mb-8 bg-muted/60 border-none shadow-none">
            <CardContent className="py-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" placeholder="Dhruvil" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" placeholder="Patel" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="dhruvil@example.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div>
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
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help you..." rows={4} required />
                </div>
                <div className="flex items-center space-x-2">
                  <input id="newsletter" type="checkbox" className="rounded border-border" />
                  <Label htmlFor="newsletter" className="text-sm text-muted-foreground">Subscribe to our newsletter</Label>
                </div>
                <Button type="submit" className="w-full" variant="secondary">
                  <Send className="mr-2 h-4 w-4" />Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-8">
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-primary mb-2">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/40 transition-colors">
                    <div className="p-2 bg-primary rounded">
                      <method.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{method.title}</div>
                      <div className="text-xs text-muted-foreground">{method.description}</div>
                      <a href={method.action} className="text-sm text-primary hover:underline">{method.value}</a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-primary mb-2">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Mon - Fri:</span><span className="font-medium">9:00 AM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday:</span><span className="font-medium">10:00 AM - 4:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday:</span><span className="font-medium">Closed</span></div>
                </div>
                <div className="mt-3 p-2 bg-accent/40 rounded">
                  <p className="text-xs text-muted-foreground"><Globe className="h-3 w-3 inline mr-1" />24/7 online complaint submission available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-12">
          <Card className="bg-background border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-primary text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-1">
                    <div className="font-semibold text-foreground">{faq.question}</div>
                    <div className="text-sm text-muted-foreground">{faq.answer}</div>
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
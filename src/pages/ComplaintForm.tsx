import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/layout/Navbar";
// ...existing code...
import { Link } from "react-router-dom";
import { 
  Camera, 
  MapPin, 
  AlertCircle, 
  Upload,
  Globe,
  Bot,
  Zap
} from "lucide-react";
import { useState } from "react";
import SimplePopup from "@/components/ui/SimplePopup";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  // Set to true for testing; replace with Supabase auth state in production
  const [isLoggedIn] = useState(true); // This will be managed by Supabase auth
  const [complaintId, setComplaintId] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [serialForDay, setSerialForDay] = useState(1); // In real app, fetch from backend
  const [aadhaar, setAadhaar] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("en");

  const handleSendOtp = () => {
    // Simulate sending OTP (replace with real API call)
    if (aadhaar.length === 12) {
      setOtpSent(true);
  // OTP sent: show a toast or inline message here if needed
    } else {
  // Invalid Aadhaar: show a toast or inline message here if needed
    }
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification (replace with real API call)
    if (otp === "123456") {
      setOtpVerified(true);
  // OTP verified: show a toast or inline message here if needed
    } else {
  // Invalid OTP: show a toast or inline message here if needed
    }
  };

  function generateComplaintId() {
    const prefix = "CMP";
    const state = "GJ";
    const city = "AN";
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, '0') +
      String(date.getDate()).padStart(2, '0');
    const serial = String(serialForDay).padStart(5, '0');
    return `${prefix}-${state}-${city}-${dateStr}-${serial}`;
  }

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Gather form data from fields
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);5
    const data = {
      aadhaar,
      location,
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      priority: formData.get("priority")?.toString() || "",
      // Add other fields as needed
    };
    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }
      const resData = await response.json();
  setComplaintId(resData.complaintId ? resData.complaintId.toString() : resData._id || "");
  setPopupOpen(true);
  // Optionally reset form fields here
  // form.reset();
    } catch (error) {
      alert("There was an error submitting your complaint. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const [location, setLocation] = useState("");
  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          // Unable to retrieve location: show a toast or inline message here if needed
        }
      );
    } else {
  // Geolocation not supported: show a toast or inline message here if needed
    }
  };

  const categories = [
    "Roads & Infrastructure",
    "Street Lighting",
    "Water & Drainage",
    "Waste Management",
    "Traffic Issues",
    "Public Safety",
    "Parks & Recreation",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SimplePopup open={popupOpen} onClose={() => { setPopupOpen(false); navigate("/complaint-progress"); }}>
        <div className="text-center">
          <div className="font-bold text-lg mb-2">Complaint Submitted!</div>
          <div className="text-muted-foreground text-sm">Your complaint ID is <span className="font-mono font-bold text-primary">{complaintId}</span>. Please save this ID to track your complaint.</div>
        </div>
      </SimplePopup>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Report a Civic Issue
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us make your city better by reporting issues. Our AI will automatically categorize 
            and route your complaint to the appropriate department.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>English</span>
            </Button>
            <Button
              variant={language === "gu" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("gu")}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>ગુજરાતી</span>
            </Button>
          </div>
        </div>

        {/* Login Alert */}
        {!isLoggedIn && (
          <Alert className="mb-6 border-warning bg-warning/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                create an account
              </Link>{" "}
              to submit a complaint.
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>{language === "en" ? "Complaint Details" : "ફરિયાદની વિગતો"}</span>
            </CardTitle>
            <CardDescription>
              {language === "en" 
                ? "Fill in the details below. Our AI will help categorize your issue automatically."
                : "નીચે વિગતો ભરો. અમારું AI તમારી સમસ્યાને આપમેળે વર્ગીકૃત કરવામાં મદદ કરશે."
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Aadhaar Verification */}
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number (for identity verification)</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  maxLength={12}
                  minLength={12}
                  pattern="\d{12}"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaar}
                  onChange={e => setAadhaar(e.target.value.replace(/\D/g, ""))}
                  required
                  disabled={otpSent || otpVerified}
                />
                {!otpSent && !otpVerified && (
                  <Button type="button" variant="outline" onClick={handleSendOtp}>
                    Send OTP
                  </Button>
                )}
                {otpSent && !otpVerified && (
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="otp"
                      type="text"
                      maxLength={6}
                      minLength={6}
                      pattern="\d{6}"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                    <Button type="button" variant="outline" onClick={handleVerifyOtp}>
                      Verify OTP
                    </Button>
                  </div>
                )}
                {otpVerified && (
                  <div className="text-success font-semibold">Aadhaar verified</div>
                )}
              </div>
              {/* Reporter Name */}
              <div className="space-y-2">
                <Label htmlFor="reporterName">
                  {language === "en" ? "Your Name" : "તમારું નામ"}
                </Label>
                <Input
                  id="reporterName"
                  type="text"
                  placeholder={language === "en" ? "Dhruvil" : "ધ્રુવિલ"}
                  defaultValue="Dhruvil"
                  required
                />
              </div>

              {/* Issue Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  {language === "en" ? "Issue Title" : "સમસ્યાનું શીર્ષક"}
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder={language === "en" ? "e.g., Pothole on Main Street" : "ઉદા. મેઇન સ્ટ્રીટ પર ખાડો"}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  {language === "en" ? "Category" : "વર્ગ"}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({language === "en" ? "AI will suggest based on description" : "AI વર્ણન આધારિત સૂચન આપશે"})
                  </span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "en" ? "Select category or let AI decide" : "વર્ગ પસંદ કરો અથવા AI ને નક્કી કરવા દો"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  {language === "en" ? "Description" : "વર્ણન"}
                </Label>
                <Textarea
                  id="description"
                  placeholder={language === "en" 
                    ? "Describe the issue in detail. Include when you first noticed it, its severity, and any other relevant information..."
                    : "સમસ્યાનું વિગતવાર વર્ણન કરો. તમે તેને પ્રથમ વખત ક્યારે જોયું, તેની ગંભીરતા અને અન્ય સંબંધિત માહિતી સામેલ કરો..."
                  }
                  rows={4}
                  required
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">
                  {language === "en" ? "Upload Photo" : "ફોટો અપલોડ કરો"}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({language === "en" ? "AI will analyze for better categorization" : "AI વધુ સારા વર્ગીકરણ માટે વિશ્લેષણ કરશે"})
                  </span>
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {selectedFile 
                        ? selectedFile.name
                        : (language === "en" ? "Click to upload photo" : "ફોટો અપલોડ કરવા માટે ક્લિક કરો")
                      }
                    </p>
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  {language === "en" ? "Location" : "સ્થાન"}
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    type="text"
                    placeholder={language === "en" ? "Enter address or landmark" : "સરનામું અથવા મુખ્ય સ્થળ દાખલ કરો"}
                    className="flex-1"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                  />
                  <Button type="button" variant="outline" className="flex items-center space-x-2" onClick={handleUseGPS}>
                    <MapPin className="h-4 w-4" />
                    <span>{language === "en" ? "Use GPS" : "GPS વાપરો"}</span>
                  </Button>
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">
                  {language === "en" ? "Priority Level" : "પ્રાથમિકતા સ્તર"}
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "en" ? "Select priority" : "પ્રાથમિકતા પસંદ કરો"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{language === "en" ? "Low - Minor inconvenience" : "નીચું - નાની અસુવિધા"}</SelectItem>
                    <SelectItem value="medium">{language === "en" ? "Medium - Moderate issue" : "મધ્યમ - મધ્યમ સમસ્યા"}</SelectItem>
                    <SelectItem value="high">{language === "en" ? "High - Safety concern" : "ઊંચું - સુરક્ષાની ચિંતા"}</SelectItem>
                    <SelectItem value="urgent">{language === "en" ? "Urgent - Immediate action needed" : "તાત્કાલિક - તત્કાલ કાર્યવાહીની જરૂર"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* AI Features Info */}
              <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                <div className="flex items-start space-x-3">
                  <Bot className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      {language === "en" ? "AI-Powered Processing" : "AI-સંચાલિત પ્રક્રિયા"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" 
                        ? "Once submitted, our AI will automatically categorize your complaint and route it to the appropriate department for faster resolution."
                        : "એકવાર સબમિટ થયા પછી, અમારું AI તમારી ફરિયાદને આપમેળે વર્ગીકૃત કરશે અને ઝડપી ઉકેલ માટે યોગ્ય વિભાગને મોકલશે."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="flex-1"
                  disabled={!isLoggedIn}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {language === "en" ? "Submit Complaint" : "ફરિયાદ સબમિટ કરો"}
                </Button>
                <Button type="button" variant="outline">
                  {language === "en" ? "Save Draft" : "ડ્રાફ્ટ સેવ કરો"}
                </Button>
              </div>
              {complaintId && (
                <div className="mt-6 p-4 bg-success/10 border border-success rounded-lg text-center">
                  <div className="font-bold text-success mb-2">Complaint Submitted!</div>
                  <div className="text-sm text-foreground">Your Numeric Complaint ID:</div>
                  <div className="font-mono text-lg text-success mt-1">{complaintId}</div>
                  <div className="text-xs text-muted-foreground mt-2">Please save this number to track your complaint.</div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Expected Process */}
        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">
              {language === "en" ? "What happens next?" : "આગળ શું થશે?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-sm">
                    {language === "en" ? "AI Analysis & Routing" : "AI વિશ્લેષણ અને રૂટિંગ"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Your complaint is automatically categorized and sent to the relevant department" : "તમારી ફરિયાદ આપમેળે વર્ગીકૃત થાય છે અને સંબંધિત વિભાગને મોકલવામાં આવે છે"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-sm">
                    {language === "en" ? "Department Review" : "વિભાગીય સમીક્ષા"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "The assigned department reviews your complaint and begins investigation" : "સોંપેલ વિભાગ તમારી ફરિયાદની સમીક્ષા કરે છે અને તપાસ શરૂ કરે છે"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-sm">
                    {language === "en" ? "Resolution & Update" : "ઉકેલ અને અપડેટ"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "You receive updates on progress and notification when the issue is resolved" : "તમને પ્રગતિ અંગે અપડેટ્સ અને સમસ્યા હલ થયા પર સૂચના મળે છે"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintForm;
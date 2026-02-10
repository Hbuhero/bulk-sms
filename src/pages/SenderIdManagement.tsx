import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings, MessageSquare, Mail, Server, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SenderIdManagement = () => {
  const { toast } = useToast();
  const [senderType, setSenderType] = useState("sms");
  const [newSenderId, setNewSenderId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  
  // Email SMTP fields
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [smtpUsername, setSmtpUsername] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");

  // WhatsApp fields
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [businessAccountId, setBusinessAccountId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const countries = [
    { code: "KE", name: "Kenya" },
    { code: "UG", name: "Uganda" },
    { code: "TZ", name: "Tanzania" },
    { code: "RW", name: "Rwanda" },
    { code: "ET", name: "Ethiopia" },
    { code: "BI", name: "Burundi" },
    { code: "SS", name: "South Sudan" },
    { code: "DJ", name: "Djibouti" },
    { code: "ER", name: "Eritrea" },
    { code: "SO", name: "Somalia" },
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
    { code: "NG", name: "Nigeria" },
    { code: "GH", name: "Ghana" },
    { code: "ZA", name: "South Africa" },
  ];

  const senderIds = [
    { id: 1, name: "MARKETFLOW", type: "sms", status: "Approved", country: "Kenya", created: "2024-06-15" },
    { id: 2, name: "PROMO2024", type: "sms", status: "Pending", country: "Uganda", created: "2024-07-01" },
    { id: 3, name: "ALERTS", type: "sms", status: "Approved", country: "Tanzania", created: "2024-05-20" },
    { id: 4, name: "support@company.com", type: "email", status: "Approved", host: "smtp.gmail.com", created: "2024-06-20" },
    { id: 5, name: "noreply@business.co", type: "email", status: "Pending", host: "smtp.office365.com", created: "2024-07-05" },
    { id: 6, name: "marketing@agency.com", type: "email", status: "Approved", host: "smtp.mailgun.org", created: "2024-06-10" },
    { id: 7, name: "MARKETFLOW_WA", type: "whatsapp", status: "Approved", phoneNumber: "+254700123456", created: "2024-07-15" },
    { id: 8, name: "SUPPORT_WA", type: "whatsapp", status: "Pending", phoneNumber: "+254700654321", created: "2024-07-20" },
    { id: 9, name: "PROMO_WA", type: "whatsapp", status: "Approved", phoneNumber: "+254700789123", created: "2024-07-25" },
  ];

  const senderTypeOptions = [
    {
      id: "sms",
      title: "SMS Sender ID",
      description: "Configure SMS sender identification",
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "email",
      title: "Email SMTP",
      description: "Setup email SMTP configuration",
      icon: Mail,
      color: "from-green-500 to-green-600"
    },
    {
      id: "whatsapp",
      title: "WhatsApp Sender ID",
      description: "Setup WhatsApp Business configuration",
      icon: "custom",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const handleAddSender = () => {
    if (senderType === "sms") {
      if (!newSenderId) {
        toast({
          title: "Error",
          description: "Please enter a sender ID",
          variant: "destructive",
        });
        return;
      }

      if (!selectedCountry) {
        toast({
          title: "Error",
          description: "Please select a country",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "SMS Sender ID Submitted",
        description: `Your SMS sender ID has been submitted for approval in ${countries.find(c => c.code === selectedCountry)?.name}`,
      });
    } else if (senderType === "email") {
      if (!fromEmail || !fromName || !smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
        toast({
          title: "Error",
          description: "Please fill in all SMTP configuration fields",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Email Sender Submitted",
        description: "Your email sender configuration has been submitted for approval",
      });
    } else if (senderType === "whatsapp") {
      if (!phoneNumberId || !businessAccountId || !accessToken) {
        toast({
          title: "Error",
          description: "Please fill in all WhatsApp configuration fields",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "WhatsApp Sender Submitted",
        description: "Your WhatsApp sender configuration has been submitted for approval",
      });
    }

    // Reset form
    setNewSenderId("");
    setSelectedCountry("");
    setSmtpHost("");
    setSmtpPort("");
    setSmtpUsername("");
    setSmtpPassword("");
    setFromEmail("");
    setFromName("");
    setPhoneNumberId("");
    setBusinessAccountId("");
    setAccessToken("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Sender ID Management</h1>
        <p className="text-gray-600 mt-2">Manage your SMS sender IDs and email SMTP configurations.</p>
      </div>

      {/* Add New Sender */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Sender
          </CardTitle>
          <CardDescription>
            Configure a new SMS sender ID, email SMTP settings, or WhatsApp Business for your campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Modern Sender Type Selection */}
          <div>
            <Label className="text-base font-medium mb-4 block">Choose Sender Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {senderTypeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                    senderType === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSenderType(option.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} shadow-lg`}>
                      {option.icon === "custom" ? (
                        <FaWhatsapp className="h-6 w-6" style={{ color: '#25D366' }} />
                      ) : (
                        <option.icon className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      senderType === option.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {senderType === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Sender ID Form */}
          {senderType === "sms" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sender-id">Sender ID</Label>
                <Input
                  id="sender-id"
                  placeholder="Enter sender ID (e.g., YOURCOMPANY)"
                  value={newSenderId}
                  onChange={(e) => setNewSenderId(e.target.value.toUpperCase())}
                  className="mt-1"
                  maxLength={11}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum 11 characters, alphanumeric only
                </p>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Email SMTP Form */}
          {senderType === "email" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-email">From Email Address</Label>
                  <Input
                    id="from-email"
                    type="email"
                    placeholder="noreply@yourcompany.com"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    placeholder="Your Company Name"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    placeholder="smtp.gmail.com"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    placeholder="587"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    placeholder="your-email@gmail.com"
                    value={smtpUsername}
                    onChange={(e) => setSmtpUsername(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    placeholder="Your app password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Form */}
          {senderType === "whatsapp" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone-number-id">Phone Number ID (Verified phone number)</Label>
                <Input
                  id="phone-number-id"
                  placeholder="Enter your verified phone number ID"
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your verified WhatsApp Business phone number ID
                </p>
              </div>
              
              <div>
                <Label htmlFor="business-account-id">WhatsApp Business Account ID (Verified Business Account ID)</Label>
                <Input
                  id="business-account-id"
                  placeholder="Enter your verified business account ID"
                  value={businessAccountId}
                  onChange={(e) => setBusinessAccountId(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your verified WhatsApp Business Account ID
                </p>
              </div>
              
              <div>
                <Label htmlFor="access-token">Permanent Access Token (Permanent Access Token)</Label>
                <Input
                  id="access-token"
                  type="password"
                  placeholder="Enter your permanent access token"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your permanent WhatsApp Business API access token
                </p>
              </div>
            </div>
          )}

          <Button onClick={handleAddSender} variant="default">
            Submit for Approval
          </Button>
        </CardContent>
      </Card>

      {/* Existing Sender IDs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Your Senders
          </CardTitle>
          <CardDescription>
            View and manage your existing SMS sender IDs and email configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {senderIds.map((sender) => (
              <div key={sender.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                    {sender.type === "sms" ? (
                      <MessageSquare className="h-4 w-4 text-white" />
                    ) : sender.type === "whatsapp" ? (
                      <FaWhatsapp className="h-4 w-4" style={{ color: '#25D366' }} />
                    ) : (
                      <Mail className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{sender.name}</p>
                    <p className="text-sm text-gray-500">
                      Type: {sender.type.toUpperCase()} • 
                      {sender.type === "sms" ? ` Country: ${sender.country}` : 
                       sender.type === "whatsapp" ? ` Phone: ${(sender as any).phoneNumber}` : 
                       ` Host: ${(sender as any).host}`} • 
                      Created: {sender.created}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={sender.status === 'Approved' ? 'default' : 'secondary'}
                  className={sender.status === 'Approved' ? 'bg-green-500' : ''}
                >
                  {sender.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SenderIdManagement;

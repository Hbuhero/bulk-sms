import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { Upload, Send, FileText, Users, MessageSquare, Calendar, ChevronLeft, ChevronRight, Zap, Clock, CheckCircle, Mail, Phone, Type } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const SendSms = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Campaign details
  const [campaignName, setCampaignName] = useState("");
  const [messageType, setMessageType] = useState("sms"); // "sms", "email", or "whatsapp"
  
  // Step 1: Message content
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  
  // Step 2: Recipients
  const [recipientMethod, setRecipientMethod] = useState("list"); // "list", "csv", or "manual"
  const [contactList, setContactList] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [manualNumbers, setManualNumbers] = useState("");
  const [columnMapping, setColumnMapping] = useState<{ [key: string]: string }>({});
  
  // Step 3: Scheduling
  const [sendNow, setSendNow] = useState(true);
  const [scheduledDateTime, setScheduledDateTime] = useState("");

  const steps = ["Campaign Setup", "Message", "Recipients", "Schedule", "Review"];

  const smsTemplates = [
    { id: "welcome", name: "Welcome SMS", content: "Welcome to MarketFlow! Your account is now active." },
    { id: "promo", name: "Promotional Offer", content: "🎉 Special offer! Get 20% off your next purchase. Use code: SAVE20" },
    { id: "reminder", name: "Appointment Reminder", content: "Reminder: You have an appointment tomorrow at {time}. Reply CONFIRM to confirm." },
  ];

  const emailTemplates = [
    { id: "welcome-email", name: "Welcome Email", content: "Welcome to MarketFlow! We're excited to have you on board.", subject: "Welcome to MarketFlow!" },
    { id: "promo-email", name: "Promotional Email", content: "Don't miss out on our special offer! Get 20% off your next purchase with code SAVE20.", subject: "Special Offer Inside!" },
    { id: "newsletter", name: "Newsletter", content: "Here's what's new this month at MarketFlow...", subject: "MarketFlow Monthly Newsletter" },
  ];

  const currentTemplates = messageType === "sms" ? smsTemplates : emailTemplates;

  const messageTypeOptions = [
    {
      id: "sms",
      title: "SMS Campaign",
      description: "Send text messages to your contacts",
      icon: MessageSquare,
    },
    {
      id: "whatsapp",
      title: "WhatsApp Campaign",
      description: "Send WhatsApp messages to your contacts",
      icon: FaWhatsapp,
    },
    {
      id: "email",
      title: "Email Campaign",
      description: "Send email messages to your contacts",
      icon: Mail,
    }
  ];

  const messageContentOptions = [
    {
      id: "template",
      title: "Use Template",
      description: "Choose from pre-made templates",
      icon: FileText,
    },
    {
      id: "custom",
      title: "Custom Message",
      description: "Write your own message",
      icon: Type,
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setColumnMapping({
        'phone': 'Phone Number',
        'name': 'Full Name',
        'email': 'Email Address'
      });
      toast({
        title: "CSV Uploaded",
        description: "File uploaded successfully. Please map the columns.",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendMessage = () => {
    const message = useTemplate ? currentTemplates.find(t => t.id === selectedTemplate)?.content : customMessage;
    
    if (!message || !senderId || !campaignName) {
      toast({
        title: "Error",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    const scheduleText = sendNow ? "immediately" : `on ${new Date(scheduledDateTime).toLocaleString()}`;
    const messageTypeText = messageType === "sms" ? "SMS" : "Email";
    
    toast({
      title: `${messageTypeText} Campaign Scheduled!`,
      description: `Your ${messageTypeText.toLowerCase()} campaign "${campaignName}" has been queued for delivery ${scheduleText}.`,
    });

    // Reset form
    setCurrentStep(0);
    setCampaignName("");
    setMessageType("sms");
    setUseTemplate(messageType === "whatsapp" ? true : false);
    setSelectedTemplate("");
    setCustomMessage("");
    setSenderId("");
    setEmailSubject("");
    setRecipientMethod("list");
    setContactList("");
    setCsvFile(null);
    setManualNumbers("");
    setColumnMapping({});
    setSendNow(true);
    setScheduledDateTime("");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return campaignName && messageType;
      case 1:
        return senderId && (useTemplate || messageType === "whatsapp" ? selectedTemplate : customMessage) && (messageType === "sms" || messageType === "whatsapp" || emailSubject);
      case 2:
        return recipientMethod === "list" ? contactList : recipientMethod === "csv" ? csvFile : manualNumbers;
      case 3:
        return sendNow || scheduledDateTime;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold text-gray-800">Campaign Setup</CardTitle>
              <CardDescription>Start by naming your campaign and selecting the message type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="campaign-name" className="text-sm font-semibold text-gray-700">Campaign Name *</Label>
                <Input
                  id="campaign-name"
                  placeholder="Enter campaign name (e.g., Summer Sale 2024)"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Choose Campaign Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {messageTypeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                        messageType === option.id
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-muted-foreground/20 hover:border-muted-foreground/40'
                      }`}
                      onClick={() => setMessageType(option.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${messageType === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <option.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{option.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                          messageType === option.id
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/40'
                        }`}>
                          {messageType === option.id && (
                            <div className="w-full h-full rounded-full bg-background scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold">
                <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                Compose Message
              </CardTitle>
              <CardDescription className="text-base">
                Create your campaign message and select delivery method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="sender-id" className="text-sm font-semibold">
                  {messageType === "sms" || messageType === "whatsapp" ? "Sender ID *" : "From Email *"}
                </Label>
                <Select value={senderId} onValueChange={setSenderId}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={messageType === "sms" || messageType === "whatsapp" ? "Select sender ID" : "Select from email"} />
                  </SelectTrigger>
                  <SelectContent>
                    {messageType === "sms" ? (
                      <>
                        <SelectItem value="MARKETFLOW">MARKETFLOW</SelectItem>
                        <SelectItem value="ALERTS">ALERTS</SelectItem>
                        <SelectItem value="PROMO2024">PROMO2024</SelectItem>
                      </>
                    ) : messageType === "whatsapp" ? (
                      <>
                        <SelectItem value="MARKETFLOW_WA">MARKETFLOW_WA</SelectItem>
                        <SelectItem value="SUPPORT_WA">SUPPORT_WA</SelectItem>
                        <SelectItem value="PROMO_WA">PROMO_WA</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="noreply@marketflow.com">noreply@marketflow.com</SelectItem>
                        <SelectItem value="marketing@marketflow.com">marketing@marketflow.com</SelectItem>
                        <SelectItem value="support@marketflow.com">support@marketflow.com</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {messageType === "email" && (
                <div className="space-y-3">
                  <Label htmlFor="email-subject" className="text-sm font-semibold">Email Subject *</Label>
                  <Input
                    id="email-subject"
                    placeholder="Enter email subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-4">
                <Label className="text-sm font-semibold">Message Content *</Label>
                {messageType === "whatsapp" ? (
                  // WhatsApp only shows template option
                  <div className="p-6 border-2 border-primary bg-primary/10 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">Use Template</h3>
                        <p className="text-sm text-muted-foreground mt-1">Choose from pre-approved WhatsApp templates</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {messageContentOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                          (option.id === "template" && useTemplate) || (option.id === "custom" && !useTemplate)
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-muted-foreground/20 hover:border-muted-foreground/40'
                        }`}
                        onClick={() => setUseTemplate(option.id === "template")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${
                            (option.id === "template" && useTemplate) || (option.id === "custom" && !useTemplate)
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <option.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{option.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                            (option.id === "template" && useTemplate) || (option.id === "custom" && !useTemplate)
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground/40'
                          }`}>
                            {((option.id === "template" && useTemplate) || (option.id === "custom" && !useTemplate)) && (
                              <div className="w-full h-full rounded-full bg-background scale-50"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {(useTemplate || messageType === "whatsapp") ? (
                <div className="space-y-4">
                  <Label htmlFor="template" className="text-sm font-semibold">Select Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTemplate && (
                    <div className="mt-4 p-4 bg-muted rounded-xl border">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      {messageType === "email" && (
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Subject:</span> {(currentTemplates.find(t => t.id === selectedTemplate) as any)?.subject}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">
                        {currentTemplates.find(t => t.id === selectedTemplate)?.content}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="custom-message" className="text-sm font-semibold">Custom Message</Label>
                  <Textarea
                    id="custom-message"
                    placeholder={`Enter your ${messageType} message here...`}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-32"
                    rows={5}
                  />
                  {messageType === "sms" && (
                    <div className="flex justify-between items-center">
                      <p className={`text-sm transition-colors ${
                        customMessage.length > 140 ? 'text-amber-600' : customMessage.length > 120 ? 'text-orange-500' : 'text-muted-foreground'
                      }`}>
                        {customMessage.length}/160 characters
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {Math.ceil(customMessage.length / 160)} SMS
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold">
                <Users className="h-6 w-6 mr-3 text-primary" />
                Select Recipients
              </CardTitle>
              <CardDescription className="text-base">
                Choose how to select your message recipients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-semibold">Recipient Method</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    type="button"
                    variant={recipientMethod === "list" ? "default" : "outline"}
                    onClick={() => setRecipientMethod("list")}
                    className="h-16"
                  >
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Contact List</span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={recipientMethod === "csv" ? "default" : "outline"}
                    onClick={() => setRecipientMethod("csv")}
                    className="h-16"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Upload CSV</span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={recipientMethod === "manual" ? "default" : "outline"}
                    onClick={() => setRecipientMethod("manual")}
                    className="h-16"
                  >
                    <div className="flex flex-col items-center">
                      {messageType === "sms" ? <Phone className="h-5 w-5 mb-1" /> : messageType === "whatsapp" ? <Phone className="h-5 w-5 mb-1" /> : <Mail className="h-5 w-5 mb-1" />}
                      <span className="text-sm font-medium">
                        {messageType === "sms" || messageType === "whatsapp" ? "Enter Phone Numbers" : "Enter Emails"}
                      </span>
                    </div>
                  </Button>
                </div>
              </div>

              {recipientMethod === "list" ? (
                <div className="space-y-3">
                  <Label htmlFor="contact-list" className="text-sm font-semibold">Select Contact List *</Label>
                  <Select value={contactList} onValueChange={setContactList}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a contact list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vip">VIP Customers (1,250)</SelectItem>
                      <SelectItem value="newsletter">Newsletter Subscribers (5,670)</SelectItem>
                      <SelectItem value="launch">Product Launch List (890)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : recipientMethod === "csv" ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="csv-upload" className="text-sm font-semibold">Upload CSV File *</Label>
                    <div className="relative">
                      <Input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="h-12"
                      />
                    </div>
                    {csvFile && (
                      <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <p className="text-sm text-green-700 font-medium">
                          {csvFile.name} uploaded successfully
                        </p>
                      </div>
                    )}
                  </div>

                  {csvFile && Object.keys(columnMapping).length > 0 && (
                    <div className="space-y-4 p-4 bg-muted rounded-xl border">
                      <Label className="text-sm font-semibold">Column Mapping</Label>
                      <div className="grid gap-3">
                        {Object.entries(columnMapping).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-3">
                            <Label className="w-16 text-sm font-medium capitalize">{key}:</Label>
                            <Select value={value} onValueChange={(newValue) => setColumnMapping({...columnMapping, [key]: newValue})}>
                              <SelectTrigger className="flex-1 h-10">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Phone Number">Phone Number</SelectItem>
                                <SelectItem value="Full Name">Full Name</SelectItem>
                                <SelectItem value="Email Address">Email Address</SelectItem>
                                <SelectItem value="First Name">First Name</SelectItem>
                                <SelectItem value="Last Name">Last Name</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="manual-numbers" className="text-sm font-semibold">
                    {messageType === "sms" || messageType === "whatsapp" ? "Enter Phone Numbers *" : "Enter Email Addresses *"}
                  </Label>
                  <Textarea
                    id="manual-numbers"
                    placeholder={messageType === "sms" || messageType === "whatsapp" ? "Enter phone numbers separated by commas (e.g., +1234567890, +0987654321)" : "Enter email addresses separated by commas (e.g., user1@email.com, user2@email.com)"}
                    value={manualNumbers}
                    onChange={(e) => setManualNumbers(e.target.value)}
                    className="min-h-32"
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground">
                    {manualNumbers.split(',').filter(n => n.trim()).length} {messageType === "sms" ? "numbers" : "addresses"} entered
                  </p>
                </div>
              )}

              <div className="mt-6 p-4 bg-muted rounded-xl border">
                <h4 className="font-semibold mb-3">Preview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>Recipients: {
                      recipientMethod === "csv" ? (csvFile ? "From uploaded CSV" : "No file selected") : 
                      recipientMethod === "list" ? (contactList ? `From ${contactList} list` : "No list selected") :
                      (manualNumbers ? "Manual entry" : `No ${messageType === "sms" ? "numbers" : "emails"} entered`)
                    }</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>Estimated count: {
                      recipientMethod === "csv" ? "Loading..." : 
                      recipientMethod === "list" ? (contactList ? "Based on selected list" : "0") :
                      manualNumbers.split(',').filter(n => n.trim()).length
                    }</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold">
                <Calendar className="h-6 w-6 mr-3 text-primary" />
                Schedule Delivery
              </CardTitle>
              <CardDescription className="text-base">
                Choose when to send your {messageType === "sms" ? "SMS" : "email"} campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-semibold">Delivery Options</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={sendNow ? "default" : "outline"}
                    onClick={() => setSendNow(true)}
                    className="h-16"
                  >
                    <div className="flex flex-col items-center">
                      <Zap className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Send Now</span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={!sendNow ? "default" : "outline"}
                    onClick={() => setSendNow(false)}
                    className="h-16"
                  >
                    <div className="flex flex-col items-center">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Schedule Later</span>
                    </div>
                  </Button>
                </div>
              </div>

              {!sendNow && (
                <div className="space-y-4 p-4 bg-muted rounded-xl border">
                  <div className="space-y-3">
                    <Label htmlFor="scheduled-datetime" className="text-sm font-semibold">Schedule Date & Time *</Label>
                    <Input
                      id="scheduled-datetime"
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="h-12"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                </div>
              )}

              <div className="p-4 bg-muted rounded-xl border">
                <h4 className="font-semibold mb-3">Delivery Summary</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>
                    Delivery: {sendNow ? "Immediately after confirmation" : `Scheduled for ${scheduledDateTime ? new Date(scheduledDateTime).toLocaleString() : 'Not set'}`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold">
                <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                Review & Confirm
              </CardTitle>
              <CardDescription className="text-base">
                Review your {messageType === "sms" ? "SMS" : "email"} campaign details before sending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-xl bg-muted">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    Campaign Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium">Campaign Name:</span> {campaignName}</p>
                    <p className="text-muted-foreground"><span className="font-medium">Type:</span> {messageType === "sms" ? "SMS" : "Email"}</p>
                    <p className="text-muted-foreground"><span className="font-medium">{messageType === "sms" ? "Sender ID" : "From Email"}:</span> {senderId}</p>
                    {messageType === "email" && emailSubject && (
                      <p className="text-muted-foreground"><span className="font-medium">Subject:</span> {emailSubject}</p>
                    )}
                    <p className="text-muted-foreground"><span className="font-medium">Content:</span> {useTemplate ? `Template: ${currentTemplates.find(t => t.id === selectedTemplate)?.name}` : "Custom message"}</p>
                  </div>
                  <div className="mt-3 p-3 bg-background rounded-lg border">
                    <p className="text-sm leading-relaxed">{useTemplate ? currentTemplates.find(t => t.id === selectedTemplate)?.content : customMessage}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-xl bg-muted">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Recipients
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium">Method:</span> {
                        recipientMethod === "csv" ? "CSV Upload" : 
                        recipientMethod === "list" ? "Contact List" :
                        "Manual Entry"
                      }
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Source:</span> {
                        recipientMethod === "csv" ? csvFile?.name : 
                        recipientMethod === "list" ? contactList :
                        `${manualNumbers.split(',').filter(n => n.trim()).length} ${messageType === "sms" ? "numbers" : "addresses"}`
                      }
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-xl bg-muted">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Delivery Schedule
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {sendNow ? (
                      <span className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-green-600" />
                        Send immediately
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        Scheduled for {scheduledDateTime ? new Date(scheduledDateTime).toLocaleString() : 'Not set'}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            Send Campaign
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create and send SMS or email campaigns with templates, contact lists, and scheduling.
          </p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} className="max-w-3xl mx-auto" />
        {renderStepContent()}

        <div className="flex justify-between items-center pt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="h-12 px-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-3">
            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={handleSendMessage}
                className="h-12 px-8"
              >
                {sendNow ? (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Send Now
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Campaign
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-12 px-8"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendSms;

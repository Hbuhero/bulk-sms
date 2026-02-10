import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailTemplateManagement = () => {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState("");
  const [templateSubject, setTemplateSubject] = useState("");
  const [templateContent, setTemplateContent] = useState("");

  const templates = [
    { 
      id: 1, 
      name: "Welcome Email", 
      subject: "Welcome to MarketFlow!", 
      content: "Thank you for joining MarketFlow. We're excited to have you on board...", 
      category: "Welcome", 
      created: "2024-06-15" 
    },
    { 
      id: 2, 
      name: "Newsletter Template", 
      subject: "Weekly Newsletter - {date}", 
      content: "Here's what's new this week at MarketFlow...", 
      category: "Newsletter", 
      created: "2024-06-20" 
    },
    { 
      id: 3, 
      name: "Promotional Email", 
      subject: "Exclusive Offer Just for You!", 
      content: "Don't miss out on our limited-time offer...", 
      category: "Promotion", 
      created: "2024-06-25" 
    },
  ];

  const handleSaveTemplate = () => {
    if (!templateName || !templateSubject || !templateContent) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Template Saved",
      description: "Your email template has been saved successfully",
    });
    setTemplateName("");
    setTemplateSubject("");
    setTemplateContent("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Email Template Management</h1>
        <p className="text-gray-600 mt-2">Create and manage reusable email templates for your campaigns.</p>
      </div>

      {/* Create New Template */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create New Email Template
          </CardTitle>
          <CardDescription>
            Create reusable email templates with dynamic placeholders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="template-subject">Email Subject</Label>
            <Input
              id="template-subject"
              placeholder="Enter email subject"
              value={templateSubject}
              onChange={(e) => setTemplateSubject(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="template-content">Email Content</Label>
            <Textarea
              id="template-content"
              placeholder="Enter your email content here... Use {placeholder} for dynamic content"
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
              className="mt-1"
              rows={8}
            />
            <p className="text-sm text-gray-500 mt-1">
              Use {"{name}"}, {"{email}"}, {"{date}"} for dynamic content
            </p>
          </div>
          <Button onClick={handleSaveTemplate} variant="default">
            Save Template
          </Button>
        </CardContent>
      </Card>

      {/* Existing Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Your Email Templates
          </CardTitle>
          <CardDescription>
            View and manage your existing email templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Subject: {template.subject}</p>
                    <Badge variant="outline" className="mt-2">{template.category}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{template.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-400">Created: {template.created}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplateManagement;

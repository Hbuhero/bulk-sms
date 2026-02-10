import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageSquare, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SmsTemplateManagement = () => {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");

  const templates = [
    { id: 1, name: "Welcome SMS", content: "Welcome to MarketFlow! Your account is now active.", category: "Welcome", created: "2024-06-15" },
    { id: 2, name: "Promotional Offer", content: "🎉 Special offer! Get 20% off your next purchase. Use code: SAVE20", category: "Promotion", created: "2024-06-20" },
    { id: 3, name: "Appointment Reminder", content: "Reminder: You have an appointment tomorrow at {time}. Reply CONFIRM to confirm.", category: "Reminder", created: "2024-06-25" },
  ];


  const handleSaveTemplate = () => {
    if (!templateName || !templateContent) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Template Saved",
      description: "Your SMS template has been saved successfully",
    });
    setTemplateName("");
    setTemplateContent("");
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">SMS Template Management</h1>
        <p className="text-gray-600 mt-2">Create and manage reusable SMS templates for your campaigns.</p>
      </div>

      {/* Create New Template */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create New SMS Template
          </CardTitle>
          <CardDescription>
            Create reusable SMS templates with dynamic placeholders
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
            <Label htmlFor="template-content">SMS Content</Label>
            <Textarea
              id="template-content"
              placeholder="Enter your SMS content here... Use {placeholder} for dynamic content"
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
              className="mt-1"
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-1">
              {templateContent.length}/160 characters • Use {"{name}"}, {"{date}"}, {"{time}"} for dynamic content
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
            <MessageSquare className="h-5 w-5 mr-2" />
            Your SMS Templates
          </CardTitle>
          <CardDescription>
            View and manage your existing SMS templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{template.name}</h3>
                    <Badge variant="outline" className="mt-1">{template.category}</Badge>
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
                <p className="text-gray-600 mb-2">{template.content}</p>
                <p className="text-sm text-gray-400">Created: {template.created}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmsTemplateManagement;
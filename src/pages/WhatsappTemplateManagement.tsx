import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhatsappTemplateManagement = () => {
  const { toast } = useToast();
  const [whatsappTemplateName, setWhatsappTemplateName] = useState("");
  const [whatsappTemplateContent, setWhatsappTemplateContent] = useState("");

  const whatsappTemplates = [
    { id: 1, name: "Welcome Message", content: "Hello {{1}}, welcome to MarketFlow! Your account is now active and ready to use.", category: "Welcome", created: "2024-06-15" },
    { id: 2, name: "Order Confirmation", content: "Hi {{1}}, your order #{{2}} has been confirmed. Expected delivery: {{3}}. Thank you for choosing us!", category: "Transactional", created: "2024-06-20" },
    { id: 3, name: "Support Follow-up", content: "Hello {{1}}, we hope your issue has been resolved. If you need further assistance, please don't hesitate to contact us.", category: "Support", created: "2024-06-25" },
  ];

  const handleSaveWhatsappTemplate = () => {
    if (!whatsappTemplateName || !whatsappTemplateContent) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "WhatsApp Template Saved",
      description: "Your WhatsApp template has been saved successfully",
    });
    setWhatsappTemplateName("");
    setWhatsappTemplateContent("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center">
          <FaWhatsapp className="h-8 w-8 mr-3" style={{ color: '#25D366' }} />
          WhatsApp Template Management
        </h1>
        <p className="text-gray-600 mt-2">Create and manage WhatsApp Business templates for your campaigns.</p>
      </div>

      {/* Create New WhatsApp Template */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create New WhatsApp Template
          </CardTitle>
          <CardDescription>
            Create WhatsApp Business templates with placeholders (use {"{1}"} for variables)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="whatsapp-template-name">Template Name</Label>
            <Input
              id="whatsapp-template-name"
              placeholder="Enter WhatsApp template name"
              value={whatsappTemplateName}
              onChange={(e) => setWhatsappTemplateName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="whatsapp-template-content">WhatsApp Content</Label>
            <Textarea
              id="whatsapp-template-content"
              placeholder="Enter your WhatsApp content here... Use {{1}}, {{2}} for dynamic placeholders"
              value={whatsappTemplateContent}
              onChange={(e) => setWhatsappTemplateContent(e.target.value)}
              className="mt-1"
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-1">
              {whatsappTemplateContent.length}/1024 characters • Use {"{1}"} for name, {"{2}"} for dynamic content
            </p>
          </div>
          <Button onClick={handleSaveWhatsappTemplate} variant="default">
            Save WhatsApp Template
          </Button>
        </CardContent>
      </Card>

      {/* Existing WhatsApp Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaWhatsapp className="h-5 w-5 mr-2" style={{ color: '#25D366' }} />
            Your WhatsApp Templates
          </CardTitle>
          <CardDescription>
            View and manage your existing WhatsApp Business templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {whatsappTemplates.map((template) => (
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

export default WhatsappTemplateManagement;

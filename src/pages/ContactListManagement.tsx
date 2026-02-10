
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Upload, Edit, Trash2, Download, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const ContactListManagement = () => {
  const { toast } = useToast();
  const [newListName, setNewListName] = useState("");
  const [contactType, setContactType] = useState("phone");

  const contactTypeOptions = [
    {
      id: "phone",
      title: "Phone Numbers",
      description: "SMS contact list for phone numbers",
      icon: Phone,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "email",
      title: "Email Addresses",
      description: "Email contact list for email addresses",
      icon: Mail,
      color: "from-green-500 to-green-600"
    },
    {
      id: "whatsapp",
      title: "WhatsApp Numbers",
      description: "WhatsApp contact list for WhatsApp numbers",
      icon: FaWhatsapp,
      color: "from-green-600 to-green-700"
    }
  ];

  const contactLists = [
    { 
      id: 1, 
      name: "VIP Customers", 
      contacts: 1250, 
      type: "phone",
      created: "2024-06-15", 
      lastUpdated: "2024-06-30",
      tags: ["Premium", "Active"]
    },
    { 
      id: 2, 
      name: "Newsletter Subscribers", 
      contacts: 5670, 
      type: "email",
      created: "2024-05-20", 
      lastUpdated: "2024-07-01",
      tags: ["Newsletter", "Engaged"]
    },
    { 
      id: 3, 
      name: "Product Launch List", 
      contacts: 890, 
      type: "phone",
      created: "2024-06-28", 
      lastUpdated: "2024-06-29",
      tags: ["Launch", "Beta"]
    },
    { 
      id: 4, 
      name: "Abandoned Cart", 
      contacts: 423, 
      type: "email",
      created: "2024-06-30", 
      lastUpdated: "2024-07-01",
      tags: ["Ecommerce", "Recovery"]
    },
  ];

  const handleCreateList = () => {
    if (!newListName) {
      toast({
        title: "Error",
        description: "Please enter a list name",
        variant: "destructive",
      });
      return;
    }

    const typeMap = {
      phone: "phone numbers",
      email: "email addresses", 
      whatsapp: "WhatsApp numbers"
    };
    
    toast({
      title: "List Created",
      description: `Contact list "${newListName}" for ${typeMap[contactType as keyof typeof typeMap]} has been created successfully`,
    });
    setNewListName("");
  };

  const handleImportContacts = () => {
    toast({
      title: "Import Started",
      description: "Contact import process has been initiated",
    });
  };

  const handleDownloadTemplate = () => {
    const typeMap = {
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp"
    };
    
    toast({
      title: "Template Downloaded",
      description: `${typeMap[contactType as keyof typeof typeMap]} template has been downloaded`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Contact List Management</h1>
        <p className="text-gray-600 mt-2">Manage your contact lists and import new contacts.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Lists</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold">8,233</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Lists</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create New Contact List
          </CardTitle>
          <CardDescription>
            Create a new contact list to organize your contacts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Type Selection */}
          <div>
            <Label className="text-base font-medium mb-4 block">Choose Contact Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactTypeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                    contactType === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setContactType(option.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} shadow-lg`}>
                      {option.icon === FaWhatsapp ? (
                        <option.icon className="h-6 w-6" style={{ color: '#25D366' }} />
                      ) : (
                        <option.icon className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      contactType === option.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {contactType === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* List Name Input */}
          <div>
            <Label htmlFor="list-name">List Name</Label>
            <Input
              id="list-name"
              placeholder="Enter list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleCreateList} variant="default">
              Create List
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleImportContacts}>
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Lists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Your Contact Lists
          </CardTitle>
          <CardDescription>
            View and manage your existing contact lists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contactLists.map((list) => (
              <div key={list.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                      {list.type === "phone" ? (
                        <Phone className="h-4 w-4 text-white" />
                      ) : list.type === "whatsapp" ? (
                        <FaWhatsapp className="h-4 w-4" style={{ color: '#25D366' }} />
                      ) : (
                        <Mail className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{list.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {list.contacts.toLocaleString()} contacts • Type: {list.type.toUpperCase()} • Created: {list.created} • Updated: {list.lastUpdated}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {list.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between text-sm">
                    <span>Active Contacts: {Math.floor(list.contacts * 0.85).toLocaleString()}</span>
                    <span>Inactive: {Math.floor(list.contacts * 0.15).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactListManagement;

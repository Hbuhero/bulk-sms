import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Code, Key, Settings, Globe, Copy, Eye, EyeOff, RefreshCw, CheckCircle2, AlertCircle, Send, Play, Cable, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiIntegration = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState("POST");
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("curl");
  const [requestBody, setRequestBody] = useState("");
  const [showDocs, setShowDocs] = useState(false);
  const { toast } = useToast();

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText("mk_live_4f8a9b2c3d1e5f6g7h8i9j0k1l2m3n4o");
    toast({
      title: "API Key Copied",
      description: "Your API key has been copied to clipboard.",
    });
  };

  const handleRegenerateKey = () => {
    toast({
      title: "API Key Regenerated",
      description: "Your new API key is ready. Update your applications.",
      variant: "destructive",
    });
  };

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/sms/send",
      description: "Send SMS messages",
      status: "Active",
      requestBody: {
        "to": "+1234567890",
        "from": "MYCOMPANY",
        "message": "Hello, this is a test SMS message!"
      }
    },
    {
      method: "POST", 
      endpoint: "/api/v1/email/send",
      description: "Send email messages",
      status: "Active",
      requestBody: {
        "to": "user@example.com",
        "from": "noreply@mycompany.com",
        "subject": "Welcome to our service",
        "html": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
        "text": "Welcome! Thank you for joining us."
      }
    },
    {
      method: "POST",
      endpoint: "/api/v1/whatsapp/send",
      description: "Send WhatsApp messages",
      status: "Active",
      requestBody: {
        "to": "+1234567890",
        "template_name": "welcome_message",
        "template_params": ["John", "Premium Plan"]
      }
    },
    {
      method: "GET",
      endpoint: "/api/v1/delivery-status/{id}",
      description: "Get message delivery status",
      status: "Active",
      requestBody: null
    },
    {
      method: "GET",
      endpoint: "/api/v1/balance",
      description: "Check account balance",
      status: "Active",
      requestBody: null
    },
    {
      method: "GET",
      endpoint: "/api/v1/contacts",
      description: "List contact groups",
      status: "Active",
      requestBody: null
    }
  ];

  const webhookEvents = [
    { event: "message.sent", description: "When a message is successfully sent", enabled: true },
    { event: "message.delivered", description: "When a message is delivered", enabled: true },
    { event: "message.failed", description: "When a message delivery fails", enabled: true },
    { event: "balance.low", description: "When account balance is low", enabled: false },
    { event: "sender.blocked", description: "When a sender ID is blocked", enabled: true }
  ];

  const generateCodeExample = (endpoint, language) => {
    const baseUrl = "https://api.marketflow.com";
    const fullUrl = `${baseUrl}${endpoint.endpoint}`;
    const hasBody = endpoint.requestBody !== null;
    
    switch (language) {
      case "curl":
        return `curl -X ${endpoint.method} "${fullUrl}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"${hasBody ? ` \\
  -d '${JSON.stringify(endpoint.requestBody, null, 2)}'` : ''}`;

      case "javascript":
        return `const response = await fetch('${fullUrl}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }${hasBody ? `,
  body: JSON.stringify(${JSON.stringify(endpoint.requestBody, null, 2)})` : ''}
});

const data = await response.json();
console.log(data);`;

      case "python":
        return `import requests
import json

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
${hasBody ? `
data = ${JSON.stringify(endpoint.requestBody, null, 2)}

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers, json=data)` : `
response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`}
print(response.json())`;

      case "php":
        return `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${fullUrl}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => '${endpoint.method}',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
  ),${hasBody ? `
  CURLOPT_POSTFIELDS => json_encode(${JSON.stringify(endpoint.requestBody, null, 2).replace(/"/g, "'")})` : ''}
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>`;

      case "go":
        return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "${fullUrl}"
    
    ${hasBody ? `data := map[string]interface{}{
${Object.entries(endpoint.requestBody).map(([key, value]) => `        "${key}": ${JSON.stringify(value)},`).join('\n')}
    }
    
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("${endpoint.method}", url, bytes.NewBuffer(jsonData))` : `req, _ := http.NewRequest("${endpoint.method}", url, nil)`}
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`;

      default:
        return "Select a language to see code example";
    }
  };

  const handleSendRequest = async () => {
    const endpoint = apiEndpoints[selectedEndpoint];
    toast({
      title: "Request Sent",
      description: `${endpoint.method} request sent to ${endpoint.endpoint}`,
    });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Code example copied to clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">API Integration</h1>
          <p className="text-muted-foreground mt-2">Integrate MarketFlow with your applications using our REST API.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showDocs} onOpenChange={setShowDocs}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Cable className="h-5 w-5 mr-2" />
                  API Documentation
                </DialogTitle>
                <DialogDescription>
                  Complete reference guide for MarketFlow API endpoints
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm mb-2">All API requests require authentication using your API key in the Authorization header:</p>
                    <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <code>https://api.marketflow.com</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Response Format</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">{`{
  "status": "success|error",
  "data": { ... },
  "message": "Description of the result",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Rate Limiting</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                      <li>• 1000 requests per minute per API key</li>
                      <li>• Rate limit headers included in responses</li>
                      <li>• HTTP 429 status when limit exceeded</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Error Codes</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-mono">400</span>
                        <span>Bad Request - Invalid parameters</span>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-mono">401</span>
                        <span>Unauthorized - Invalid API key</span>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-mono">403</span>
                        <span>Forbidden - Insufficient permissions</span>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-mono">429</span>
                        <span>Too Many Requests - Rate limit exceeded</span>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-mono">500</span>
                        <span>Internal Server Error - Server issue</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Endpoint Details</h3>
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                            {endpoint.method}
                          </Badge>
                          <code className="font-mono text-sm">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{endpoint.description}</p>
                        
                        {endpoint.requestBody && (
                          <div>
                            <h5 className="font-medium mb-2">Request Body:</h5>
                            <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                              {JSON.stringify(endpoint.requestBody, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
            <CardTitle className="flex items-center">
              <Cable className="h-5 w-5 mr-2" />
              API Status
            </CardTitle>
                <CardDescription>Current API service status and usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Service Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Version</span>
                  <Badge variant="outline">v1.0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rate Limit</span>
                  <span className="text-sm text-muted-foreground">1000 req/min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">This Month Usage</span>
                  <span className="text-sm font-medium">12,456 requests</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Quick Setup
                </CardTitle>
                <CardDescription>Get started with our API in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    Generate API Key
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    Configure Webhooks
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Test Integration
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Go Live
                  </div>
                </div>
                <Button className="w-full mt-4">Start Integration Guide</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Key Management
              </CardTitle>
              <CardDescription>
                Manage your API keys for secure access to MarketFlow services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Production API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="api-key"
                        type={showApiKey ? "text" : "password"}
                        value="mk_live_4f8a9b2c3d1e5f6g7h8i9j0k1l2m3n4o"
                        readOnly
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button variant="outline" onClick={handleCopyApiKey}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={handleRegenerateKey}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep your API key secure. Never expose it in client-side code.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sandbox-key">Sandbox API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sandbox-key"
                      type="password"
                      value="mk_test_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this key for testing without sending real messages.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">API Key Permissions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Send SMS Messages</span>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Send Email Messages</span>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Send WhatsApp Messages</span>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Access Reports</span>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage Contacts</span>
                    <Switch checked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Endpoint List */}
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  Select an endpoint to test and generate code examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apiEndpoints.map((endpoint, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-colors ${selectedEndpoint === index ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => {
                        setSelectedEndpoint(index);
                        setRequestBody(endpoint.requestBody ? JSON.stringify(endpoint.requestBody, null, 2) : "");
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {endpoint.endpoint}
                            </code>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            {endpoint.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Tester */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  API Tester
                </CardTitle>
                <CardDescription>
                  Test the selected endpoint with custom parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Endpoint</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant={apiEndpoints[selectedEndpoint].method === "GET" ? "secondary" : "default"}>
                      {apiEndpoints[selectedEndpoint].method}
                    </Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
                      {apiEndpoints[selectedEndpoint].endpoint}
                    </code>
                  </div>
                </div>

                {apiEndpoints[selectedEndpoint].requestBody && (
                  <div className="space-y-2">
                    <Label htmlFor="request-body">Request Body</Label>
                    <Textarea
                      id="request-body"
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder="Enter JSON request body"
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                )}

                <Button onClick={handleSendRequest} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </Button>

                <div className="border-t pt-4">
                  <Label className="text-sm font-medium">Response</Label>
                  <div className="bg-muted p-3 rounded-lg mt-2">
                    <pre className="text-sm">
{`{
  "status": "success",
  "message_id": "msg_123456789",
  "delivery_status": "sent",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Code Generator
              </CardTitle>
              <CardDescription>
                Generate code examples in multiple programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="language-select">Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curl">cURL</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={() => handleCopyCode(generateCodeExample(apiEndpoints[selectedEndpoint], selectedLanguage))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>

                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateCodeExample(apiEndpoints[selectedEndpoint], selectedLanguage)}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>
                Receive real-time notifications about message events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="webhook-toggle">Enable Webhooks</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive HTTP callbacks for message events
                    </p>
                  </div>
                  <Switch
                    id="webhook-toggle"
                    checked={webhookEnabled}
                    onCheckedChange={setWebhookEnabled}
                  />
                </div>

                {webhookEnabled && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://yourapp.com/webhooks/marketflow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webhook-method">HTTP Method</Label>
                        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-secret">Webhook Secret</Label>
                      <Input
                        id="webhook-secret"
                        type="password"
                        placeholder="Enter a secret for webhook verification"
                      />
                      <p className="text-sm text-muted-foreground">
                        Used to verify webhook authenticity
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label>Event Subscriptions</Label>
                      {webhookEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div>
                            <span className="text-sm font-medium">{event.event}</span>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                          <Switch defaultChecked={event.enabled} />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custom-headers">Custom Headers</Label>
                      <Textarea
                        id="custom-headers"
                        placeholder="Authorization: Bearer token&#10;X-Custom-Header: value"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button>Save Configuration</Button>
                      <Button variant="outline">Test Webhook</Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiIntegration;
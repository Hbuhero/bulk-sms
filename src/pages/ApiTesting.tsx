
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Code, Send, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ApiTesting = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    senderId: "",
    message: "",
    jwtToken: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber || !formData.senderId || !formData.message || !formData.jwtToken) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = {
        status: 200,
        message: "Accepted",
        messageId: `msg_${Date.now()}`,
        timestamp: new Date().toISOString(),
        phoneNumber: formData.phoneNumber,
        senderId: formData.senderId
      };
      
      setResponse(mockResponse);
      toast.success("SMS sent successfully!");
    } catch (error) {
      toast.error("Failed to send SMS");
      setResponse({
        status: 400,
        error: "Bad Request",
        message: "Invalid request parameters"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                API Testing Console
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test our SMS API endpoint directly from your browser. Send test messages and see real-time responses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* API Testing Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send SMS API Test
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jwtToken">JWT Token</Label>
                    <Input
                      id="jwtToken"
                      type="password"
                      placeholder="Bearer token for authentication"
                      value={formData.jwtToken}
                      onChange={(e) => handleInputChange("jwtToken", e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senderId">Sender ID</Label>
                    <Input
                      id="senderId"
                      placeholder="MARKETFLOW"
                      value={formData.senderId}
                      onChange={(e) => handleInputChange("senderId", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your SMS message here..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                    />
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/160 characters
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send SMS
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* API Documentation & Response */}
            <div className="space-y-6">
              {/* API Documentation */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    API Endpoint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="text-green-400 mb-2">POST /api/v1/sms</div>
                    <div className="text-gray-300 mb-4">Content-Type: application/json</div>
                    <div className="text-yellow-400 mb-2">Headers:</div>
                    <div className="text-gray-300 mb-4">Authorization: Bearer YOUR_JWT_TOKEN</div>
                    <div className="text-yellow-400 mb-2">Body:</div>
                    <pre className="text-gray-300">{`{
  "phoneNumber": "+1234567890",
  "senderId": "MARKETFLOW",
  "message": "Your message here"
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* Response Display */}
              {response && (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {response.status === 200 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      API Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`p-4 rounded-lg font-mono text-sm ${
                      response.status === 200 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className={`font-bold mb-2 ${
                        response.status === 200 ? 'text-green-800' : 'text-red-800'
                      }`}>
                        Status: {response.status}
                      </div>
                      <pre className="text-gray-800 whitespace-pre-wrap">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* API Features */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>API Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time SMS delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Global coverage (190+ countries)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Delivery status webhooks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Rate limiting (1000 req/min)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Unicode & emoji support</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApiTesting;

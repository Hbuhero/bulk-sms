
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, MessageSquare, Mail, Check, Zap, Shield, Headphones, Globe, TrendingUp, Star, Settings, FileText, BarChart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const PurchaseBundle = () => {
  const { toast } = useToast();
  const [currentBalance] = useState({ sms: 5247, email: 12500, whatsapp: 45000 });
  const [whatsappSubscribed, setWhatsappSubscribed] = useState(false);

  const smsPackages = [
    { id: 1, credits: 1000, price: 135000, popular: false, savings: 0 },
    { id: 2, credits: 5000, price: 540000, popular: true, savings: 15 },
    { id: 3, credits: 10000, price: 945000, popular: false, savings: 30 },
    { id: 4, credits: 25000, price: 2025000, popular: false, savings: 40 },
  ];

  const emailPackages = [
    { id: 1, credits: 2500, price: 67500, popular: false, savings: 0 },
    { id: 2, credits: 10000, price: 216000, popular: true, savings: 20 },
    { id: 3, credits: 25000, price: 472500, popular: false, savings: 30 },
    { id: 4, credits: 50000, price: 810000, popular: false, savings: 40 },
  ];

  const handlePurchase = (type: string, credits: number, price: number) => {
    toast({
      title: "Purchase Initiated",
      description: `Redirecting to payment for ${credits.toLocaleString()} ${type} credits (TZS ${price.toLocaleString()})`,
    });
  };

  const handleWhatsappSubscription = () => {
    if (whatsappSubscribed) {
      setWhatsappSubscribed(false);
      toast({
        title: "Unsubscribed",
        description: "You have successfully unsubscribed from WhatsApp Monthly plan",
      });
    } else {
      setWhatsappSubscribed(true);
      toast({
        title: "Subscribed",
        description: "You have successfully subscribed to WhatsApp Monthly plan with 500,000 messages",
      });
    }
  };

  const formatPrice = (price: number) => {
    return `TZS ${price.toLocaleString()}`;
  };

  const formatPricePerUnit = (price: number, credits: number) => {
    return `TZS ${Math.round(price / credits * 1000).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Power Your Campaigns
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Purchase Credits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package to fuel your marketing campaigns with competitive TZS pricing
          </p>
        </div>

        {/* Current Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-blue-100 font-medium">Current SMS Balance</p>
                  <p className="text-3xl font-bold">{currentBalance.sms.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Ready to send</span>
                  </div>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <MessageSquare className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-green-100 font-medium">Current Email Balance</p>
                  <p className="text-3xl font-bold">{currentBalance.email.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Ready to send</span>
                  </div>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Mail className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-green-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-emerald-100 font-medium">WhatsApp Balance</p>
                  <p className="text-3xl font-bold">{currentBalance.whatsapp.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Ready to send</span>
                  </div>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <FaWhatsapp className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SMS Packages */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="flex items-center justify-center text-2xl">
              <MessageSquare className="h-6 w-6 mr-3 text-blue-600" />
              SMS Credit Packages
            </CardTitle>
            <CardDescription className="text-lg">
              Reach your audience instantly with reliable SMS delivery
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {smsPackages.map((pkg) => (
                <div key={pkg.id} className={`relative group hover:scale-105 transition-all duration-300 ${
                  pkg.popular 
                    ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/25' 
                    : 'hover:shadow-lg'
                }`}>
                  <Card className={`border-0 h-full ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50' 
                      : 'bg-white'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 text-sm font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-gray-900">
                          {pkg.credits.toLocaleString()}
                        </h3>
                        <p className="text-gray-600 font-medium">SMS Credits</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {formatPrice(pkg.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPricePerUnit(pkg.price, pkg.credits)} per 1K SMS
                        </p>
                        {pkg.savings > 0 && (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            Save {pkg.savings}%
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        className={`w-full h-12 text-base font-medium transition-all duration-300 ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                        }`}
                        onClick={() => handlePurchase('SMS', pkg.credits, pkg.price)}
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Purchase Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Packages */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Mail className="h-6 w-6 mr-3 text-green-600" />
              Email Credit Packages
            </CardTitle>
            <CardDescription className="text-lg">
              Engage your customers with professional email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emailPackages.map((pkg) => (
                <div key={pkg.id} className={`relative group hover:scale-105 transition-all duration-300 ${
                  pkg.popular 
                    ? 'ring-2 ring-green-500 shadow-xl shadow-green-500/25' 
                    : 'hover:shadow-lg'
                }`}>
                  <Card className={`border-0 h-full ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50' 
                      : 'bg-white'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 text-sm font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          Best Value
                        </Badge>
                      </div>
                    )}
                    
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-gray-900">
                          {pkg.credits.toLocaleString()}
                        </h3>
                        <p className="text-gray-600 font-medium">Email Credits</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {formatPrice(pkg.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPricePerUnit(pkg.price, pkg.credits)} per 1K emails
                        </p>
                        {pkg.savings > 0 && (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            Save {pkg.savings}%
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        className={`w-full h-12 text-base font-medium transition-all duration-300 ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg'
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                        }`}
                        onClick={() => handlePurchase('Email', pkg.credits, pkg.price)}
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Purchase Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Monthly Subscription */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="flex items-center justify-center text-2xl">
              <FaWhatsapp className="h-6 w-6 mr-3" style={{ color: '#25D366' }} />
              WhatsApp Monthly Subscription
            </CardTitle>
            <CardDescription className="text-lg">
              Monthly subscription with 500,000 WhatsApp messages
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="max-w-md mx-auto">
              <div className="relative group hover:scale-105 transition-all duration-300">
                <Card className="border-0 h-full bg-gradient-to-br from-emerald-50 to-green-50 ring-2 ring-emerald-500 shadow-xl shadow-emerald-500/25">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-1 text-sm font-medium">
                      <FaWhatsapp className="h-3 w-3 mr-1" />
                      Monthly Plan
                    </Badge>
                  </div>
                  
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-gray-900">
                        500,000
                      </h3>
                      <p className="text-gray-600 font-medium">WhatsApp Messages/Month</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        TZS 1,200,000
                      </p>
                      <p className="text-sm text-gray-500">
                        TZS 2,400 per 1K messages
                      </p>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                        Best Value for Volume
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Auto-renewal monthly</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Cancel anytime</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Priority support</span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full h-12 text-base font-medium transition-all duration-300 ${
                        whatsappSubscribed
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                          : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                      } shadow-lg`}
                      onClick={handleWhatsappSubscription}
                    >
                      <FaWhatsapp className="h-5 w-5 mr-2" />
                      {whatsappSubscribed ? 'Unsubscribe' : 'Subscribe Now'}
                    </Button>
                    
                    {whatsappSubscribed && (
                      <div className="text-sm text-emerald-600 font-medium">
                        ✅ Currently subscribed - Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You Get</CardTitle>
            <CardDescription className="text-lg">Premium features included with every package</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <h4 className="text-xl font-semibold flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  SMS Features
                </h4>
                <div className="space-y-4">
                  {[
                    { icon: Globe, title: "Global SMS delivery", desc: "Reach customers worldwide" },
                    { icon: Settings, title: "Custom sender IDs", desc: "Brand your messages" },
                    { icon: Shield, title: "Delivery reports", desc: "Track message status" },
                    { icon: FileText, title: "Template management", desc: "Save and reuse templates" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-xl font-semibold flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-green-600" />
                  Email Features
                </h4>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: "High deliverability", desc: "99% inbox delivery rate" },
                    { icon: FileText, title: "HTML templates", desc: "Beautiful email designs" },
                    { icon: BarChart, title: "Open & click tracking", desc: "Detailed analytics" },
                    { icon: Headphones, title: "24/7 Support", desc: "Always here to help" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-xl font-semibold flex items-center">
                  <FaWhatsapp className="h-5 w-5 mr-2" style={{ color: '#25D366' }} />
                  WhatsApp Features
                </h4>
                <div className="space-y-4">
                  {[
                    { icon: Globe, title: "Global WhatsApp delivery", desc: "Reach customers worldwide" },
                    { icon: Shield, title: "Business verified", desc: "Official WhatsApp Business API" },
                    { icon: FileText, title: "Rich media support", desc: "Send images, videos, documents" },
                    { icon: BarChart, title: "Message analytics", desc: "Track delivery and engagement" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseBundle;

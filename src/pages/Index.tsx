
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Mail, Users, BarChart3, Shield, Zap, Code, Network, TrendingUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Bulk SMS Campaigns",
      description: "Send thousands of SMS messages instantly with our powerful bulk messaging system."
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp Campaigns",
      description: "Reach customers directly on WhatsApp with rich media messages and automated responses."
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Create beautiful email campaigns with our drag-and-drop editor and templates."
    },
    {
      icon: Users,
      title: "Contact Management",
      description: "Organize your contacts with smart lists, tags, and segmentation tools."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track opens, clicks, deliveries, and conversions with detailed reporting."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with encryption and compliance certifications."
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Set up automated campaigns and workflows to engage customers 24/7."
    },
    {
      icon: Network,
      title: "SMPP Integration",
      description: "Direct carrier connections via SMPP protocol for enhanced delivery rates and lower costs."
    },
    {
      icon: TrendingUp,
      title: "Advanced Reporting",
      description: "Deep insights with custom dashboards, A/B testing, and ROI tracking across all channels."
    }
  ];

  const stats = [
    { value: "100M+", label: "Messages Sent" },
    { value: "5M+", label: "WhatsApp Text Sent" },
    { value: "10M+", label: "Emails Sent" },
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Trusted by 50,000+ businesses worldwide
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6 leading-tight">
              Marketing
              <br />
              <span className="text-5xl md:text-7xl">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Send SMS, WhatsApp, and email campaigns that convert. Manage contacts, track performance, and grow your business with our all-in-one marketing platform powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-10 py-6 h-14 bg-primary hover:bg-primary/90 text-primary-foreground hover-scale shadow-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 h-14 hover-scale border-2">
                  Watch Demo
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                SOC 2 Compliant
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                99.9% Uptime
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-card/30 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20 mb-6">
              Features
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Everything You Need to
              <br />
              <span className="text-primary">Scale & Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help you create, send, and track campaigns that drive real results for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover-scale transition-all duration-500 border-0 shadow-sm hover:shadow-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
              Developer API
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Powerful
              <br />
              <span className="text-primary">API Integration</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Integrate our SMS, WhatsApp, and email services directly into your applications with our robust RESTful API designed for scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Card className="bg-slate-900 text-white border-0 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-700">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Code className="h-6 w-6 text-primary" />
                    API Example
                    <div className="ml-auto flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <pre className="text-sm overflow-x-auto text-slate-300 leading-relaxed">
                    <code>{`curl -X POST https://api.marketflow.com/v1/sms \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phoneNumber": "+1234567890",
    "senderId": "MARKETFLOW",
    "message": "Hello from MarketFlow!",
    "webhookUrl": "https://yourapp.com/webhook"
  }'`}</code>
                  </pre>
                </CardContent>
              </Card>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Global Delivery</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Real-time Webhooks</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Rate Protection</span>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-bold mb-4">Developer-First Integration</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our API is designed with developers in mind. Simple, RESTful endpoints with comprehensive documentation
                  and SDKs for all popular programming languages.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg mb-2">Easy Authentication</h4>
                  <p className="text-muted-foreground">Secure JWT-based authentication with API keys and OAuth 2.0 support</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg mb-2">Comprehensive Documentation</h4>
                  <p className="text-muted-foreground">Interactive API docs with live examples and code snippets</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg mb-2">Sandbox Environment</h4>
                  <p className="text-muted-foreground">Test your integration without sending real messages</p>
                </Card>
              </div>

              <Link to="/api">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                  Explore API Docs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-5xl mx-auto text-center text-primary-foreground relative z-10">
          <div className="animate-fade-in space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ready to Transform
              <br />
              Your Marketing?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ businesses already growing with our platform. Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 h-14 hover-scale shadow-xl">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-14 border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover-scale">
                  Talk to Sales
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 mt-12 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                No Setup Fees
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Cancel Anytime
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Free Support
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

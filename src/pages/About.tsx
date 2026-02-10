
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To simplify marketing communication and help businesses connect with their customers through powerful SMS and email campaigns."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "A dedicated team of developers, marketers, and support specialists committed to delivering the best marketing platform."
    },
    {
      icon: Award,
      title: "Our Values",
      description: "We believe in transparency, reliability, and putting our customers first in everything we do."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving businesses worldwide with reliable SMS and email delivery across 190+ countries."
    }
  ];

  const stats = [
    { value: "100M+", label: "Messages Delivered" },
    { value: "50K+", label: "Happy Customers" },
    { value: "190+", label: "Countries Covered" },
    { value: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About
            <span className="text-primary"> MarketFlow</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Founded in 2020, MarketFlow has been at the forefront of marketing technology, 
            helping businesses of all sizes reach their customers through powerful SMS and email campaigns. 
            Our platform combines cutting-edge technology with user-friendly design to deliver 
            exceptional marketing results.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values and mission guide everything we do at MarketFlow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              MarketFlow was born from a simple observation: businesses were struggling with 
              fragmented marketing tools that were either too complex or too limited. Our founders, 
              experienced marketers and technologists, set out to create a platform that would 
              democratize access to powerful marketing capabilities.
            </p>
            
            <p className="mb-6">
              Starting with just SMS messaging, we quickly expanded to include email marketing, 
              advanced analytics, and automation features. Today, we serve thousands of businesses 
              across the globe, from small startups to enterprise corporations.
            </p>
            
            <p>
              Our commitment to innovation and customer success drives us to continuously improve 
              our platform, ensuring that businesses of all sizes can leverage the power of 
              direct marketing to grow and thrive.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

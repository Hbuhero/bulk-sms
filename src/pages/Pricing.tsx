
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Individual",
      description: "Perfect for small businesses",
      price: "16",
      currency: "TZS",
      unit: "/ SMS",
      maxSms: "5,999 SMS Max",
      popular: false,
      features: [
        { name: "Custom Sender ID", included: true },
        { name: "Daily Report", included: true },
        { name: "Full API Access", included: true },
        { name: "24/7 Support", included: true },
        { name: "Dedicated Account Manager", included: false }
      ]
    },
    {
      name: "Community",
      description: "Perfect for growing businesses",
      price: "15",
      currency: "TZS",
      unit: "/ SMS",
      maxSms: "54,999 SMS Max",
      popular: true,
      features: [
        { name: "Custom Sender ID", included: true },
        { name: "Daily Report", included: true },
        { name: "Full API Access", included: true },
        { name: "24/7 Support", included: true },
        { name: "Dedicated Account Manager", included: false }
      ]
    },
    {
      name: "Start-up",
      description: "For established businesses",
      price: "14",
      currency: "TZS",
      unit: "/ SMS",
      maxSms: "409,999 SMS Max",
      popular: false,
      features: [
        { name: "Custom Sender ID", included: true },
        { name: "Daily Report", included: true },
        { name: "Full API Access", included: true },
        { name: "24/7 Support", included: true },
        { name: "Dedicated Account Manager", included: true }
      ]
    },
    {
      name: "Enterprise",
      description: "For high-volume senders",
      price: "Talk to Sales",
      currency: "",
      unit: "",
      maxSms: "Beyond 410,000 SMS",
      popular: false,
      features: [
        { name: "Custom Sender ID", included: true },
        { name: "Daily Report", included: true },
        { name: "Full API Access", included: true },
        { name: "24/7 Support", included: true },
        { name: "Dedicated Account Manager", included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent
              <span className="text-primary"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    POPULAR CHOICE
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.currency} {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{plan.maxSms}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">Need a custom solution? We're here to help.</p>
            <Button variant="outline" size="lg">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Reset link sent!",
      description: resetMethod === "email" 
        ? "Check your email for password reset instructions."
        : "Check your phone for the password reset code.",
    });
    
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/signin" className="flex items-center space-x-2 mb-8 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to sign in</span>
        </Link>

        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "We've sent you instructions to reset your password"
                : "Enter your email or phone number to reset your password"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <>
                <Tabs value={resetMethod} onValueChange={(value) => setResetMethod(value as "email" | "phone")} className="mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {resetMethod === "email" ? (
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="pl-10"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="pl-10"
                          placeholder="+255123456789"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    Send Reset Instructions
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  {resetMethod === "email" 
                    ? `We've sent a password reset link to ${formData.email}`
                    : `We've sent a password reset code to ${formData.phone}`
                  }
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try again
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Remember your password?{" "}
                <Link to="/signin" className="text-primary hover:underline font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;


import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut, Bell, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">
            MarketFlow
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
            Dashboard
          </Link>
          <Link to="/campaigns" className="text-gray-600 hover:text-gray-900">
            Campaigns
          </Link>
          <Link to="/contacts" className="text-gray-600 hover:text-gray-900">
            Contacts
          </Link>
          <Link to="/analytics" className="text-gray-600 hover:text-gray-900">
            Analytics
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-600">System Online</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Enhanced User Profile Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 h-auto hover:bg-gray-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">John Doe</span>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700">
                      Admin
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">john@company.com</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center space-x-3 p-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-900">John Doe</p>
                    <p className="text-xs leading-none text-gray-500">john@company.com</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700">
                        Administrator
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Profile Settings</p>
                  <p className="text-xs text-gray-500">Manage your account</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Preferences</p>
                  <p className="text-xs text-gray-500">App settings & notifications</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-3 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Sign out</p>
                  <p className="text-xs text-gray-500">End your session</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

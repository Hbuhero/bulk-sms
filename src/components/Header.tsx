
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover-scale">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-primary">
            MarketFlow
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#features" className="text-gray-600 hover:text-gray-900 story-link">Features</Link>
          <Link to="/api" className="text-gray-600 hover:text-gray-900 story-link">API</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900 story-link">Pricing</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900 story-link">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900 story-link">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/signin">
            <Button variant="ghost" className="hover-scale">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover-scale">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

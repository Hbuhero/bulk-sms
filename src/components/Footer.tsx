
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MarketFlow</span>
            </Link>
            <p className="text-gray-400">
              The complete SMS and email marketing platform for modern businesses.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white story-link">Features</a></li>
              <li><a href="#" className="hover:text-white story-link">Pricing</a></li>
              <li><a href="#" className="hover:text-white story-link">API</a></li>
              <li><a href="#" className="hover:text-white story-link">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white story-link">About</a></li>
              <li><a href="#" className="hover:text-white story-link">Blog</a></li>
              <li><a href="#" className="hover:text-white story-link">Careers</a></li>
              <li><a href="#" className="hover:text-white story-link">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white story-link">Help Center</a></li>
              <li><a href="#" className="hover:text-white story-link">Documentation</a></li>
              <li><a href="#" className="hover:text-white story-link">Status</a></li>
              <li><a href="#" className="hover:text-white story-link">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MarketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

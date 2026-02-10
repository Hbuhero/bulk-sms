import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  MessageSquare,
  Send,
  FileText,
  Mail,
  Upload,
  Calendar,
  CreditCard,
  Users,
  UserCheck,
  Inbox,
  Settings,
  LogOut,
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  UsersRound,
  Cable,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Sender IDs",
    url: "/sender-id",
    icon: ArrowLeftRight,
  },
  {
    title: "SMS Templates",
    url: "/sms-templates",
    icon: MessageSquare,
  },
  {
    title: "WhatsApp Templates",
    url: "/whatsapp-templates",
    icon: FaWhatsapp,
  },
  {
    title: "Email Templates",
    url: "/email-templates",
    icon: Mail,
  },
  {
    title: "Send Campaign",
    url: "/send-sms",
    icon: Send,
  },
  {
    title: "Outbox",
    url: "/outbox",
    icon: Inbox,
  },
  {
    title: "Tarrifs",
    url: "/tarrif",
    icon: Inbox,
  },
  {
    title: "Scheduled Messages",
    url: "/scheduled",
    icon: Calendar,
  },
  {
    title: "Contact Lists",
    url: "/contacts",
    icon: Users,
  },
  {
    title: "Purchase Bundlessss",
    url: "/purchase",
    icon: WalletCards,
  },
  {
    title: "User Management",
    url: "/users",
    icon: UsersRound,
  },
  {
    title: "API Integration",
    url: "/api-integration",
    icon: Cable,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-primary">
                MarketFlow
              </span>
            )}
          </Link>
        </div>

        <div className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Log out</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

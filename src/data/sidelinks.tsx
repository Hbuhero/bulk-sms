import {
    MessageSquare,
    Mail,
    Users,
    LayoutDashboard,
    Send,
    Calendar,
    FileText,
    Settings,
    CreditCard,
    Code,
    BarChart3,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export interface SideLink {
    title: string;
    label?: string;
    href: string;
    icon: JSX.Element;
    sub?: SideLink[];
}

export const sidelinks: SideLink[] = [
    {
        title: 'Dashboard',
        label: 'core',
        href: '/dashboard',
        icon: <LayoutDashboard size={18} />,
    },
    {
        title: 'Customers',
        label: 'core',
        href: '/dashboard/customers',
        icon: <Users size={18} />,
    },
    {
        title: 'Sender IDs',
        label: 'core',
        href: '/dashboard/sender-id',
        icon: <MessageSquare size={18} />,
    },
    {
        title: 'Transactions',
        label: 'core',
        href: '/dashboard/transactions',
        icon: <CreditCard size={18} />,
    },
    {
        title: 'Tariffs',
        label: 'core',
        href: '/dashboard/tariffs',
        icon: <BarChart3 size={18} />,
    },
    {
        title: 'Send Messages',
        label: 'messaging',
        href: '/dashboard/send-sms',
        icon: <Send size={18} />,
        sub: [
            {
                title: 'Send SMS',
                label: 'sms',
                href: '/dashboard/send-sms',
                icon: <MessageSquare size={18} />,
            },
            {
                title: 'Send Email',
                label: 'email',
                href: '',
                icon: <Mail size={18} />,
            },
            {
                title: 'Send WhatsApp',
                label: 'whatsapp',
                href: '',
                icon: <FaWhatsapp size={18} />,
            },
        ],
    },
    {
        title: 'Templates',
        label: 'templates',
        href: '/dashboard/sms-templates',
        icon: <FileText size={18} />,
        sub: [
            {
                title: 'SMS Templates',
                label: 'sms',
                href: '/dashboard/sms-templates',
                icon: <MessageSquare size={18} />,
            },
            {
                title: 'Email Templates',
                label: 'email',
                href: '/dashboard/email-templates',
                icon: <Mail size={18} />,
            },
            {
                title: 'WhatsApp Templates',
                label: 'whatsapp',
                href: '/dashboard/whatsapp-templates',
                icon: <FaWhatsapp size={18} />,
            },
        ],
    },
    {
        title: 'Contacts',
        label: 'core',
        href: '/dashboard/contacts',
        icon: <Users size={18} />,
    },
    
    {
        title: 'Campaigns',
        label: 'campaigns',
        href: '/dashboard/scheduled',
        icon: <Calendar size={18} />,
        sub: [
            {
                title: 'Scheduled Messages',
                label: 'scheduled',
                href: '/dashboard/scheduled',
                icon: <Calendar size={18} />,
            },
            {
                title: 'Outbox',
                label: 'outbox',
                href: '/dashboard/outbox',
                icon: <Send size={18} />,
            },
        ],
    },
    
    {
        title: 'Reports',
        label: 'core',
        href: '/dashboard/reports',
        icon: <BarChart3 size={18} />,
    },
    {
        title: 'API Integration',
        label: 'developer',
        href: '/dashboard/api-integration',
        icon: <Code size={18} />,
    },
    {
        title: 'Purchase Bundles',
        label: 'billing',
        href: '/dashboard/purchase',
        icon: <CreditCard size={18} />,
    },
    {
        title: 'User Management',
        label: 'admin',
        href: '/dashboard/users',
        icon: <Users size={18} />,
    },
    {
        title: 'Account Management',
        label: 'admin',
        href: '/dashboard/accounts',
        icon: <Settings size={18} />,
    },
];

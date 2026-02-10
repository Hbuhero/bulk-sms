import { Outlet, Link } from 'react-router-dom';
import useCheckActiveNav from '@/hooks/use-check-active-nav';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
    SidebarFooter
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { sidelinks, SideLink } from "@/data/sidelinks";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from '@/lib/utils';

// Navigation Link Component
interface NavLinkProps extends SideLink {
    subLink?: boolean
}

function NavLink({ title, icon, href, subLink = false }: NavLinkProps) {
    const { checkActiveNav } = useCheckActiveNav()
    const linkPath = href.startsWith('/') ? href : `/dashboard/${href}`
    const isActive = checkActiveNav(linkPath)

    if (subLink) {
        return (
            <div className="relative ml-4">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/30 to-transparent"></div>
                <div className="absolute left-0 top-1/2 w-3 h-px bg-primary/30"></div>

                <Link
                    to={linkPath}
                    className={`flex items-center py-2 px-4 ml-3 rounded-r-md text-sm transition-all duration-200 ${isActive
                        ? 'bg-primary/10 dark:bg-primary/20 font-semibold'
                        : 'hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    <div className={`mr-3 flex-shrink-0 w-4 h-4 flex items-center justify-center text-xs ${isActive ? 'opacity-100' : 'opacity-70'
                        }`}>
                        {icon}
                    </div>
                    <span className="font-medium text-xs">{title}</span>
                </Link>
            </div>
        )
    }

    return (
        <SidebarMenuButton
            asChild
            isActive={isActive}
            className={`h-10 w-full justify-start text-sm ${isActive
                ? '!bg-primary/10 dark:!bg-primary/20 font-semibold'
                : 'hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-gray-300'
                }`}
        >
            <Link
                to={linkPath}
                className={`w-full flex items-center py-3 px-3 rounded-md text-left transition-all duration-200 ${isActive
                    ? 'p-1 bg-primary/10 dark:bg-primary/20 font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                    }`}
            >
                <div className={`mr-4 flex-shrink-0 w-5 h-5 flex items-center justify-center`}>
                    {icon}
                </div>
                <span className="flex-1 text-left font-medium text-xs">{title}</span>
            </Link>
        </SidebarMenuButton>
    )
}

// Dropdown Navigation Component
function NavLinkDropdown({ title, icon, sub }: NavLinkProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <CollapsibleTrigger
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' }),
                        'group h-10 w-full justify-start rounded-none py-3 px-3 rounded-md text-left cursor-pointer transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-gray-300'
                    )}
                >
                    <div className='mr-4 flex-shrink-0 w-5 h-5 flex items-center justify-center'>{icon}</div>
                    <span className="flex-1 text-left font-medium text-xs">{title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform flex-shrink-0 text-gray-400 dark:text-gray-500 ${isOpen ? 'rotate-180 text-primary' : ''
                        }`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mb-2">
                    {sub?.map((sublink) => (
                        <div key={sublink.title}>
                            {sublink.sub ? (
                                <NavLinkDropdown {...sublink} subLink />
                            ) : (
                                <NavLink {...sublink} subLink />
                            )}
                        </div>
                    ))}
                    {isOpen && (
                        <div className="mt-4 mx-3 relative">
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent transform translate-y-px"></div>
                        </div>
                    )}
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

export default function AppShell() {
    return (
        <div className='relative h-full overflow-hidden bg-background'>
            <SidebarProvider>
                <div className="min-h-screen flex w-full">
                    {/* Sidebar */}
                    <Sidebar className="w-64">
                        <SidebarContent>
                            <div className="p-4 lg:p-6 border-b">
                                <div className="flex items-center space-x-2 lg:space-x-3">
                                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-foreground font-bold text-sm">WBS</span>
                                    </div>
                                    <div className="min-w-0">
                                        <h1 className="text-lg lg:text-xl font-bold text-primary truncate">Web Bulk Sms</h1>
                                        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">Admin Panel</p>
                                    </div>
                                </div>
                            </div>

                            <SidebarGroup>
                                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {sidelinks.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                {item.sub ? (
                                                    <NavLinkDropdown {...item} />
                                                ) : (
                                                    <NavLink {...item} />
                                                )}
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>

                        <SidebarFooter className="p-3 lg:p-4 border-t">
                            <Button
                                variant="outline"
                                className="!bg-background w-full justify-start text-sm hover:border-red-500 hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </SidebarFooter>
                    </Sidebar>

                    {/* Main content area */}
                    <SidebarInset className="flex-1 flex flex-col min-w-0">
                        {/* Header */}
                        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
                            <SidebarTrigger className="md:hidden" />

                            {/* Mobile logo */}
                            <div className="flex items-center gap-2 md:hidden flex-1">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">MF</span>
                                </div>
                                <span className="font-bold text-primary text-sm">MarketFlow</span>
                            </div>

                            {/* Desktop header space */}
                            <div className="hidden md:flex md:items-center md:justify-end md:w-full md:gap-3 lg:gap-4">
                                {/* Add theme switch or other controls here if needed */}
                            </div>
                        </header>

                        {/* Main content */}
                        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                            <Outlet />
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
}

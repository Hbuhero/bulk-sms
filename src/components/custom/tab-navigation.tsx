import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface Tab {
    id: string;
    label: string;
    icon: LucideIcon;
    description?: string;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

export function TabNavigation({ tabs, activeTab, onTabChange, className }: TabNavigationProps) {
    return (
        <div className={cn('border-b border-gray-200 dark:border-gray-700', className)}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            )}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <Icon
                                className={cn(
                                    'mr-2 h-5 w-5',
                                    isActive
                                        ? 'text-primary'
                                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                )}
                            />
                            <span>{tab.label}</span>
                            {tab.description && (
                                <span className="ml-2 hidden text-xs text-gray-400 lg:inline">
                                    {tab.description}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
